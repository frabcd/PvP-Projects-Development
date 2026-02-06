/*
 * assets.js
 * Handles loading of external assets (models, animations).
 */

import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export const emperorAssets = {
    model: null,
    animations: {}
};

const loader = new FBXLoader();

/**
 * Loads a single FBX file and returns the model/animation.
 * @param {string} path 
 * @returns {Promise<THREE.Group>}
 */
function loadFBX(path) {
    return new Promise((resolve, reject) => {
        loader.load(path, (fbx) => {
            resolve(fbx);
        }, undefined, (err) => {
            console.error(`Failed to load FBX: ${path}`, err);
            reject(err);
        });
    });
}

/**
 * Pre-loads all Emperor assets.
 */
export async function loadEmperorAssets(onProgress) {
    const assetsToLoad = {
        idle: 'movement/Standing Idle.fbx',
        walk_f: 'movement/Standing Walk Forward.fbx',
        walk_l: 'movement/Standing Walk Left.fbx',
        walk_r: 'movement/Standing Walk Right.fbx',
        attack: 'movement/Standing Melee Attack Downward.fbx',
        s1: 'movement/Unarmed Grab Torch From Wall.fbx',
        s3: 'movement/Flip Kick.fbx',
        s4: 'movement/Standing 2H Magic Attack 01.fbx'
    };

    const keys = Object.keys(assetsToLoad);
    const total = keys.length;
    let loaded = 0;

    for (const key of keys) {
        const fbx = await loadFBX(assetsToLoad[key]);

        if (key === 'idle') {
            emperorAssets.model = fbx;
            // Scale and prepare model
            emperorAssets.model.scale.set(0.025, 0.025, 0.025);
            emperorAssets.model.traverse(child => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }

        if (fbx.animations && fbx.animations.length > 0) {
            const anim = fbx.animations[0];
            anim.name = key;
            stripRootMotion(anim); // FIX: Remove root motion so it stays in place
            emperorAssets.animations[key] = anim;
        }

        loaded++;
        if (onProgress) onProgress(loaded / total);
    }

    // Alias walk_b to walk_r as requested
    emperorAssets.animations['walk_b'] = emperorAssets.animations['walk_r'];

    console.log("Emperor assets loaded:", emperorAssets);
}

/**
 * Strips X/Z root motion from an animation clip.
 * Keeps Y motion (bobbing) but prevents the model from walking away from its center.
 * @param {THREE.AnimationClip} clip 
 */
function stripRootMotion(clip) {
    clip.tracks.forEach(track => {
        // Look for Hips or Root position tracks
        if (track.name.match(/hips\.position/i) || track.name.match(/root\.position/i)) {
            const values = track.values;
            // Iterate through x, y, z triplets
            for (let i = 0; i < values.length; i += 3) {
                values[i] = 0;     // X -> 0
                // values[i+1] = values[i+1]; // Y -> Keep original (bobbing)
                values[i + 2] = 0;   // Z -> 0
            }
        }
    });
}
