export function HeroArtwork() {
  return (
    <svg
      className="hero-visual__fallback"
      viewBox="53 36 394 328"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="laptop-ground-glow">
          <stop offset="0" stopColor="#c8ff3d" stopOpacity=".05" />
          <stop offset="1" stopColor="#c8ff3d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="screen-glow" x2="1" y2="1">
          <stop stopColor="#111a14" />
          <stop offset="1" stopColor="#18271d" />
        </linearGradient>
      </defs>
      <ellipse
        cx="263"
        cy="287"
        rx="178"
        ry="82"
        fill="url(#laptop-ground-glow)"
      />
      <g strokeLinecap="round" strokeLinejoin="round">
        <path
          d="m151 267 12-171 12-14 163-13 14 13-12 172z"
          fill="#303a33"
          stroke="#849187"
          strokeWidth="2"
        />
        <path
          d="m165 94 160-13-11 150-160 15z"
          fill="url(#screen-glow)"
          stroke="#526057"
        />
        <path d="m172 101 146-12-10 132-146 13z" fill="#0b100d" />
        <path d="m172 101 146-12-2 14-145 12z" fill="#1b241d" />
        <circle cx="183" cy="108" r="3" fill="#c8ff3d" />
        <path
          d="m200 107 24-2m9-1 24-2m9-1 24-2"
          fill="none"
          stroke="#738075"
          strokeWidth="4"
        />
        <path d="m285 97 23-2-1 8-23 2z" fill="#c8ff3d" stroke="none" />
        <path
          d="m180 132 54-5m-53 13 39-4m-38 12 28-3"
          fill="none"
          stroke="#e6ece6"
          strokeWidth="7"
        />
        <path d="m251 122 52-5-4 49-52 5z" fill="#284632" />
        <path
          d="m257 157 16-19 11 9 12-16"
          fill="none"
          stroke="#c8ff3d"
          strokeWidth="2"
        />
        <path d="m179 169 39-4-2 21-39 4z" fill="#17211a" />
        <path d="m224 165 37-3-2 21-37 3z" fill="#1d3022" />
        <path d="m267 161 37-3-2 21-37 3z" fill="#263d29" />
        <path
          d="m181 197 26-3m-24 8 20-2m22-8 20-2m-18 8 16-2m22-8 19-2m-18 8 17-2"
          fill="none"
          stroke="#869288"
          strokeWidth="3"
        />

        <path
          d="M140 274 326 253l108 42-210 44-103-47z"
          fill="#505a52"
          stroke="#8b968d"
          strokeWidth="2"
        />
        <path d="m121 292 103 47 210-44-17 18-195 45-104-47z" fill="#242d27" />
        <path
          d="m156 279 162-18 59 24-178 21z"
          fill="#303a33"
          stroke="#647067"
        />
        {Array.from({ length: 5 }, (_, row) =>
          Array.from({ length: 10 }, (_, column) => (
            <path
              key={`${row}-${column}`}
              d={`M${163 + column * 15 + row * 2} ${281 + row * 5 - column * 1.1}l11 4 3-1.5-11-4z`}
              fill="#c5d0c5"
              stroke="#e0e8df"
              strokeWidth="1.5"
            />
          )),
        )}
        <path d="m244 311 52-6 22 9-54 7z" fill="#3e4941" stroke="#8a968c" />

        <path
          d="m210 79 104-10 5 14-104 11z"
          fill="#26332a"
          stroke="#c8ff3d"
          strokeWidth="2"
        />
        <circle cx="223" cy="81" r="3" fill="#c8ff3d" />
        <path
          d="m238 78 15-1m8-1 15-2m8-1 15-1"
          fill="none"
          stroke="#a8b3a8"
          strokeWidth="4"
        />
        <path
          d="m176 153 53-5 2 36-53 6z"
          fill="none"
          stroke="#c8ff3d"
          strokeWidth="1.5"
        />
        <path d="m231 151 33-3 3 24-34 4z" fill="#253b2a" stroke="#82947f" />
        <path
          d="m192 171 48-6m-50 13 31-4"
          fill="none"
          stroke="#c8ff3d"
          strokeWidth="3"
        />
        <path
          d="m151 101-20 13m20 22-22 4m17 20-24 15m22 4-21 13"
          fill="none"
          stroke="#738075"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <circle cx="129" cy="115" r="3" fill="#c8ff3d" />
        <circle cx="126" cy="141" r="3" fill="#c8ff3d" />
        <circle cx="119" cy="175" r="3" fill="#c8ff3d" />
      </g>
    </svg>
  )
}
