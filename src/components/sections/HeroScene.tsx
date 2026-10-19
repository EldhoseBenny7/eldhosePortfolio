import { Line, RoundedBox } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  CanvasTexture,
  MathUtils,
  SRGBColorSpace,
  Vector3,
  type Group,
} from 'three'
import {
  Component,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from 'react'
import { HeroArtwork } from './HeroArtwork'

interface PointerPosition {
  x: number
  y: number
}

interface HeroSceneProps {
  pointer: MutableRefObject<PointerPosition>
  reducedMotion: boolean
  invalidateRef: MutableRefObject<() => void>
  onCanvasCreated: (canvas: HTMLCanvasElement) => void
  onFailure: () => void
}

interface SceneBoundaryProps {
  children: ReactNode
  onFailure: () => void
}

class SceneBoundary extends Component<
  SceneBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('The hero 3D scene failed to render.', error)
    this.props.onFailure()
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}

const lime = '#c8ff3d'
const muted = '#849187'
const browserControlColors = ['#708074', '#4e5b51', '#37423a'] as const
const projectThumbnailColors = ['#31543b', '#45583a', '#24473a'] as const

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
}

function createWebsiteTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640

  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Unable to create the laptop screen illustration.')
  }

  context.fillStyle = '#0b100d'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = '#171e19'
  context.fillRect(0, 0, canvas.width, 48)
  browserControlColors.forEach((color, index) => {
    context.fillStyle = color
    context.beginPath()
    context.arc(22 + index * 22, 24, 5, 0, Math.PI * 2)
    context.fill()
  })

  context.fillStyle = lime
  context.beginPath()
  context.arc(52, 96, 10, 0, Math.PI * 2)
  context.fill()
  context.fillStyle = '#edf1ec'
  context.font = '600 23px Arial, sans-serif'
  context.fillText('ELDHOSE', 75, 104)

  for (let index = 0; index < 3; index += 1) {
    roundedRect(context, 694 + index * 73, 88, 52, 8, 4)
    context.fillStyle = '#768278'
    context.fill()
  }
  roundedRect(context, 916, 78, 74, 28, 8)
  context.fillStyle = lime
  context.fill()

  context.fillStyle = '#dfe6df'
  context.font = '700 68px Arial, sans-serif'
  context.fillText('Design for', 52, 226)
  context.fillText('the real web.', 52, 304)
  context.fillStyle = '#91a096'
  roundedRect(context, 54, 334, 390, 9, 4)
  context.fill()
  roundedRect(context, 54, 354, 332, 9, 4)
  context.fill()

  roundedRect(context, 54, 393, 145, 38, 7)
  context.fillStyle = lime
  context.fill()
  roundedRect(context, 211, 393, 118, 38, 7)
  context.strokeStyle = '#77847a'
  context.lineWidth = 2
  context.stroke()

  const image = context.createLinearGradient(548, 154, 952, 372)
  image.addColorStop(0, '#1a3828')
  image.addColorStop(0.52, '#35553a')
  image.addColorStop(1, '#18271e')
  roundedRect(context, 548, 154, 424, 236, 16)
  context.fillStyle = image
  context.fill()
  context.strokeStyle = '#435247'
  context.lineWidth = 2
  context.stroke()
  context.strokeStyle = '#c8ff3d'
  context.globalAlpha = 0.72
  context.lineWidth = 3
  context.beginPath()
  context.moveTo(592, 336)
  context.lineTo(702, 251)
  context.lineTo(777, 291)
  context.lineTo(900, 205)
  context.stroke()
  context.globalAlpha = 1

  context.fillStyle = '#dfe6df'
  context.font = '600 26px Arial, sans-serif'
  context.fillText('Selected work', 54, 492)
  projectThumbnailColors.forEach((color, index) => {
    const x = 54 + index * 306
    roundedRect(context, x, 516, 278, 94, 10)
    context.fillStyle = '#17211a'
    context.fill()
    roundedRect(context, x + 12, 528, 78, 70, 7)
    context.fillStyle = color
    context.fill()
    roundedRect(context, x + 103, 540, 146, 8, 4)
    context.fillStyle = '#b5c1b7'
    context.fill()
    roundedRect(context, x + 103, 559, 112, 6, 3)
    context.fillStyle = '#6d7a70'
    context.fill()
    roundedRect(context, x + 103, 578, 54, 6, 3)
    context.fillStyle = lime
    context.fill()
  })

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.needsUpdate = true
  return texture
}

function WebsiteScreen() {
  const texture = useMemo(() => createWebsiteTexture(), [])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <mesh position={[0, 0.91, 0.058]}>
      <planeGeometry args={[2.6, 1.625]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}

function KeyboardDeck() {
  const keys = useMemo(() => {
    const standardRow = Array.from({ length: 13 }, () => 0.15)
    const rows = [
      standardRow,
      standardRow,
      standardRow,
      standardRow,
      [0.18, 0.15, 0.15, 0.15, 0.62, 0.15, 0.15, 0.15, 0.18],
    ]

    return rows.flatMap((widths, row) => {
      const gap = 0.032
      const rowWidth =
        widths.reduce((total, width) => total + width, 0) +
        gap * (widths.length - 1)
      let x = -rowWidth / 2

      return widths.map((width) => {
        const key = { x: x + width / 2, z: -0.35 + row * 0.16, width }
        x += width + gap
        return key
      })
    })
  }, [])

  return (
    <group>
      <RoundedBox
        args={[2.72, 0.018, 0.92]}
        radius={0.035}
        smoothness={3}
        position={[0, 0.069, -0.12]}
      >
        <meshStandardMaterial
          color="#303a32"
          roughness={0.48}
          metalness={0.28}
        />
      </RoundedBox>
      {keys.map((key, index) => (
        <RoundedBox
          key={index}
          args={[key.width * 0.92, 0.065, 0.14]}
          radius={0.02}
          smoothness={4}
          position={[key.x, 0.115, key.z]}
        >
          <meshBasicMaterial
            color={index === 16 ? lime : '#c5d0c5'}
            toneMapped={false}
          />
        </RoundedBox>
      ))}
      <RoundedBox
        args={[0.72, 0.012, 0.43]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.079, 0.58]}
      >
        <meshStandardMaterial
          color="#313a33"
          roughness={0.38}
          metalness={0.18}
        />
      </RoundedBox>
    </group>
  )
}

function NavigationLayer() {
  return (
    <group position={[0, 1.98, -0.34]}>
      <RoundedBox args={[2.02, 0.22, 0.055]} radius={0.035} smoothness={3}>
        <meshStandardMaterial
          color="#253029"
          roughness={0.42}
          metalness={0.18}
          emissive="#142018"
          emissiveIntensity={0.2}
        />
      </RoundedBox>
      <mesh position={[-0.82, 0.01, 0.032]}>
        <circleGeometry args={[0.045, 12]} />
        <meshBasicMaterial color={lime} />
      </mesh>
      {[-0.35, 0.02, 0.39].map((x) => (
        <RoundedBox
          key={x}
          args={[0.22, 0.035, 0.012]}
          radius={0.015}
          smoothness={2}
          position={[x, 0, 0.034]}
        >
          <meshBasicMaterial color={muted} />
        </RoundedBox>
      ))}
      <RoundedBox
        args={[0.32, 0.09, 0.014]}
        radius={0.025}
        smoothness={2}
        position={[0.75, 0, 0.034]}
      >
        <meshBasicMaterial color={lime} />
      </RoundedBox>
    </group>
  )
}

function ProjectCardLayer() {
  return (
    <group position={[1.38, 0.91, -0.25]} rotation={[0, -0.12, -0.03]}>
      <RoundedBox args={[0.76, 0.7, 0.06]} radius={0.04} smoothness={3}>
        <meshStandardMaterial
          color="#29342c"
          roughness={0.38}
          metalness={0.2}
          emissive="#162519"
          emissiveIntensity={0.18}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.62, 0.27, 0.018]}
        radius={0.025}
        smoothness={2}
        position={[0, 0.16, 0.042]}
      >
        <meshStandardMaterial color="#31533a" roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0.16, 0.053]}>
        <icosahedronGeometry args={[0.105, 0]} />
        <meshBasicMaterial color={lime} wireframe transparent opacity={0.85} />
      </mesh>
      <RoundedBox
        args={[0.43, 0.035, 0.014]}
        radius={0.012}
        smoothness={2}
        position={[-0.08, -0.07, 0.042]}
      >
        <meshBasicMaterial color="#e0e7df" />
      </RoundedBox>
      <RoundedBox
        args={[0.33, 0.022, 0.014]}
        radius={0.01}
        smoothness={2}
        position={[-0.13, -0.14, 0.042]}
      >
        <meshBasicMaterial color="#89958b" />
      </RoundedBox>
      <RoundedBox
        args={[0.2, 0.055, 0.016]}
        radius={0.015}
        smoothness={2}
        position={[-0.19, -0.24, 0.042]}
      >
        <meshBasicMaterial color={lime} />
      </RoundedBox>
    </group>
  )
}

function ConnectedDataLayer() {
  const nodes = [
    new Vector3(-1.5, 0.58, -0.34),
    new Vector3(-1.69, 0.88, -0.3),
    new Vector3(-1.45, 1.15, -0.32),
  ] as const

  return (
    <group>
      <Line
        points={[
          nodes[0],
          new Vector3(-1.3, 0.76, -0.46),
          new Vector3(-1.08, 0.9, -0.62),
        ]}
        color="#78936f"
        lineWidth={1}
        transparent
        opacity={0.78}
      />
      <Line
        points={[
          nodes[1],
          new Vector3(-1.37, 0.96, -0.45),
          new Vector3(-1.08, 0.9, -0.62),
        ]}
        color={lime}
        lineWidth={1.1}
        transparent
        opacity={0.8}
      />
      <Line
        points={[
          nodes[2],
          new Vector3(-1.28, 1.04, -0.45),
          new Vector3(-1.08, 0.9, -0.62),
        ]}
        color="#78936f"
        lineWidth={1}
        transparent
        opacity={0.78}
      />
      {nodes.map((node, index) => (
        <mesh key={index} position={node}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={index === 1 ? lime : '#b8c3b8'} />
        </mesh>
      ))}
      <mesh position={[-1.08, 0.9, -0.62]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={lime} />
      </mesh>
    </group>
  )
}

function InvalidationRegistrar({
  invalidateRef,
}: Pick<HeroSceneProps, 'invalidateRef'>) {
  const invalidate = useThree((state) => state.invalidate)

  useEffect(() => {
    invalidateRef.current = invalidate
    invalidate()

    return () => {
      invalidateRef.current = () => {}
    }
  }, [invalidate, invalidateRef])

  return null
}

function Laptop({
  pointer,
  reducedMotion,
}: Pick<HeroSceneProps, 'pointer' | 'reducedMotion'>) {
  const laptop = useRef<Group>(null)
  const screen = useRef<Group>(null)
  const invalidate = useThree((state) => state.invalidate)

  useFrame((_, delta) => {
    if (!laptop.current || !screen.current) return
    if (reducedMotion) return

    const targetYaw = -0.38 + pointer.current.x * 0.3
    const targetPitch = -0.14 + pointer.current.y * 0.12
    const targetRoll = -pointer.current.x * 0.11 + pointer.current.y * 0.06
    const targetScreenAngle = -0.35 - pointer.current.y * 0.045
    laptop.current.rotation.y = MathUtils.damp(
      laptop.current.rotation.y,
      targetYaw,
      2.4,
      delta,
    )
    laptop.current.rotation.x = MathUtils.damp(
      laptop.current.rotation.x,
      targetPitch,
      2.4,
      delta,
    )
    laptop.current.rotation.z = MathUtils.damp(
      laptop.current.rotation.z,
      targetRoll,
      2.4,
      delta,
    )
    screen.current.rotation.x = MathUtils.damp(
      screen.current.rotation.x,
      targetScreenAngle,
      2.4,
      delta,
    )

    if (
      Math.abs(laptop.current.rotation.y - targetYaw) > 0.001 ||
      Math.abs(laptop.current.rotation.x - targetPitch) > 0.001 ||
      Math.abs(laptop.current.rotation.z - targetRoll) > 0.001 ||
      Math.abs(screen.current.rotation.x - targetScreenAngle) > 0.001
    ) {
      invalidate()
    }
  })

  return (
    <group
      ref={laptop}
      position={[0, -0.05, 0]}
      rotation={[-0.14, -0.38, 0]}
      scale={1.32}
    >
      <mesh
        position={[0, -0.13, 0.16]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.7, 0.8, 1]}
      >
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.42} />
      </mesh>

      <RoundedBox
        args={[3.02, 0.12, 1.76]}
        radius={0.085}
        smoothness={4}
        position={[0, 0, 0.1]}
      >
        <meshStandardMaterial
          color="#39423c"
          roughness={0.42}
          metalness={0.42}
        />
      </RoundedBox>
      <KeyboardDeck />

      <mesh position={[0, 0.055, -0.73]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 2.48, 20]} />
        <meshStandardMaterial
          color="#566159"
          roughness={0.32}
          metalness={0.58}
        />
      </mesh>

      <group ref={screen} position={[0, 0.055, -0.73]} rotation={[-0.35, 0, 0]}>
        <RoundedBox
          args={[2.78, 1.82, 0.075]}
          radius={0.07}
          smoothness={4}
          position={[0, 0.91, 0]}
        >
          <meshStandardMaterial
            color="#59635b"
            roughness={0.38}
            metalness={0.42}
          />
        </RoundedBox>
        <RoundedBox
          args={[2.66, 1.7, 0.018]}
          radius={0.035}
          smoothness={3}
          position={[0, 0.91, 0.045]}
        >
          <meshStandardMaterial
            color="#090e0b"
            roughness={0.24}
            metalness={0.12}
          />
        </RoundedBox>
        <WebsiteScreen />
        <mesh position={[0, 1.78, 0.056]}>
          <circleGeometry args={[0.012, 12]} />
          <meshBasicMaterial color="#9da89d" />
        </mesh>

        <Line
          points={[
            new Vector3(-0.96, 1.58, 0.062),
            new Vector3(0.96, 1.58, 0.062),
            new Vector3(0.96, 1.76, 0.062),
            new Vector3(-0.96, 1.76, 0.062),
            new Vector3(-0.96, 1.58, 0.062),
          ]}
          color={lime}
          lineWidth={0.7}
          transparent
          opacity={0.3}
        />
      </group>

      <Line
        points={[
          new Vector3(0, 1.65, -0.66),
          new Vector3(0, 1.78, -0.48),
          new Vector3(0, 1.93, -0.34),
        ]}
        color="#8a9c80"
        lineWidth={0.8}
        dashed
        dashSize={0.04}
        gapSize={0.035}
        transparent
        opacity={0.7}
      />
      <NavigationLayer />

      <Line
        points={[
          new Vector3(1.12, 1.02, -0.66),
          new Vector3(1.26, 1.01, -0.43),
          new Vector3(1.37, 0.99, -0.25),
        ]}
        color="#8a9c80"
        lineWidth={0.8}
        dashed
        dashSize={0.04}
        gapSize={0.035}
        transparent
        opacity={0.7}
      />
      <ProjectCardLayer />
      <ConnectedDataLayer />
    </group>
  )
}

export function HeroScene({
  pointer,
  reducedMotion,
  invalidateRef,
  onCanvasCreated,
  onFailure,
}: HeroSceneProps) {
  return (
    <SceneBoundary onFailure={onFailure}>
      <Canvas
        className="hero-visual__canvas"
        aria-hidden="true"
        dpr={[1, 1.4]}
        frameloop="demand"
        camera={{
          position: [3.25, 7.3, 7.1],
          fov: 34,
          near: 0.1,
          far: 30,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'low-power',
          stencil: false,
        }}
        onCreated={({ gl, camera }) => {
          camera.lookAt(0, 0.72, 0)
          camera.updateProjectionMatrix()
          onCanvasCreated(gl.domElement)
        }}
        fallback={<HeroArtwork />}
      >
        <InvalidationRegistrar invalidateRef={invalidateRef} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[-3, 5, 4]} intensity={2.25} />
        <directionalLight position={[4, 2, -3]} color={lime} intensity={1.15} />
        <pointLight
          position={[1.8, 1.2, 2.7]}
          color="#c8ff3d"
          intensity={0.3}
          distance={6}
        />
        <Laptop pointer={pointer} reducedMotion={reducedMotion} />
      </Canvas>
    </SceneBoundary>
  )
}
