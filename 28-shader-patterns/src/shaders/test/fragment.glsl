varying vec2 vUV;

void main() {
    float strength = step(0.8, mod(vUV.x * 10.0, 1.0));

    strength += step(0.8, mod(vUV.y * 10.0, 1.0));

    strength = clamp(strength, 0.0, 1.0);

    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUV, 1.0);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);
}