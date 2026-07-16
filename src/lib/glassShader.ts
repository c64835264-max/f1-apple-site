// Vertex shader – passes normal and view position to fragment
export const vertexGLSL = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader – liquid‑glass effect
export const fragmentGLSL = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uFresnelColor;
  uniform float uFresnelPower;
  uniform vec3 uGlassTint;
  uniform vec2 uResolution;

  void main() {
    // Fresnel term for rim glow
    float fresnel = pow(1.0 - dot(normalize(vNormal), normalize(vViewPosition)), uFresnelPower);
    vec3 fresnelColor = mix(uColor, uFresnelColor, fresnel);

    // Animated noise for liquid surface
    float noise = sin(dot(vViewPosition * 2.0 + uTime * 0.5, vec3(12.9898, 78.233, 45.164)) * 0.1);
    noise = fract(sin(noise * 43758.5453) * 0.0000123456);

    // Fake refraction (view‑dependent offset)
    vec2 refraction = (vViewPosition.xy / uResolution) * 0.02;
    vec2 uv = gl_FragCoord.xy / uResolution + refraction;

    // Base glass color with tint
    vec3 baseColor = mix(uColor, uGlassTint, 0.15);

    // Final color: mix base + fresnel + noise, keep transparency
    vec3 color = mix(baseColor, fresnelColor, fresnel * 0.6) + noise * 0.1;
    float alpha = 0.85; // overall glass transparency

    gl_FragColor = vec4(color, alpha);
  }
`;


