// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
// uniform mat4 modelViewMatrix;

uniform vec2 uFrequency;
uniform float uTime;

// attribute vec3 position;
// attribute vec2 uv;

varying vec2 vUV;
varying float vElevation;

// attribute float aRandom;

// varying float vRandom;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUV = uv;
    vElevation = elevation;
    // vRandom = aRandom;
}