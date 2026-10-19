import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react'
import { HeroArtwork } from './HeroArtwork'

const HeroScene = lazy(() =>
  import('./HeroScene').then((module) => ({ default: module.HeroScene })),
)

interface PointerPosition {
  x: number
  y: number
}

interface NavigatorCapabilities extends Navigator {
  connection?: {
    saveData?: boolean
  }
  deviceMemory?: number
}

function isLowCapabilityDevice() {
  if (typeof navigator === 'undefined') return false

  const capabilities = navigator as NavigatorCapabilities
  return (
    capabilities.connection?.saveData === true ||
    (capabilities.deviceMemory !== undefined && capabilities.deviceMemory <= 1)
  )
}

export function HeroVisual() {
  const pointer = useRef<PointerPosition>({ x: 0, y: 0 })
  const invalidateScene = useRef<() => void>(() => {})
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ??
        false),
  )
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
    null,
  )
  const [sceneReady, setSceneReady] = useState(false)
  const [sceneFailed, setSceneFailed] = useState(false)
  const hasWebGL =
    typeof window !== 'undefined' &&
    ('WebGLRenderingContext' in window || 'WebGL2RenderingContext' in window)
  const useStaticArtwork = !hasWebGL || isLowCapabilityDevice() || sceneFailed

  function handleCanvasCreated(canvas: HTMLCanvasElement) {
    setCanvasElement(canvas)
    setSceneReady(true)
  }

  useEffect(() => {
    if (!window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', updateMotionPreference)
    updateMotionPreference()

    return () =>
      mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!canvasElement) return

    const handleContextLost = () => setSceneFailed(true)
    canvasElement.addEventListener('webglcontextlost', handleContextLost, {
      once: true,
    })

    return () =>
      canvasElement.removeEventListener('webglcontextlost', handleContextLost)
  }, [canvasElement])

  function updatePointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect()
    if (bounds.width === 0 || bounds.height === 0) return

    pointer.current = {
      x: Math.max(
        -1,
        Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2),
      ),
      y: Math.max(
        -1,
        Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2),
      ),
    }
    invalidateScene.current()
  }

  return (
    <div
      className="hero-visual"
      role="img"
      aria-label="A 3D illustration of an open laptop displaying a portfolio website, with its keyboard and connected data points visible"
      onPointerMove={updatePointer}
      onPointerLeave={() => {
        pointer.current = { x: 0, y: 0 }
        invalidateScene.current()
      }}
    >
      <div
        className={
          useStaticArtwork || !sceneReady
            ? 'hero-visual__fallback-wrap'
            : 'hero-visual__fallback-wrap hero-visual__fallback-wrap--hidden'
        }
        aria-hidden="true"
      >
        <HeroArtwork />
      </div>
      {!useStaticArtwork && (
        <Suspense fallback={null}>
          <HeroScene
            pointer={pointer}
            reducedMotion={reducedMotion}
            invalidateRef={invalidateScene}
            onCanvasCreated={handleCanvasCreated}
            onFailure={() => setSceneFailed(true)}
          />
        </Suspense>
      )}
    </div>
  )
}
