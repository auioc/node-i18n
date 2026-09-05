import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import { execSync } from 'node:child_process';
import pkg from './package.json' with { type: 'json' };

const exec = (/** @type {string} */ cmd) => execSync(cmd).toString().trim();

const dev = process.env.NODE_ENV !== 'production';

const ver = (() => {
    const r = {
        version: pkg.version,
        branch: exec('git branch --show-current'),
        commit: exec('git rev-parse --verify HEAD'),
        dirty: exec('git status --short').length !== 0,
        dev: dev,
        text: '',
        builtTime: new Date().toISOString(),
    };
    r.text = `v${r.version} - ${r.branch}@${r.commit.slice(0, 8)}`;
    if (r.dirty) r.text += '*';
    if (dev) r.text += '(dev)';
    return r;
})();

/**
 * @param {string} type
 */
function banner(type) {
    return `/*!
 * ${type} of ${pkg.name}
 * ${pkg.homepage}
 * Generated at ${ver.builtTime}
 * Version: ${ver.text}
 * Copyright (C) 2026 AUIOC.ORG
 * Copyright (C) 2022-2026 PCC-Studio
 * Licensed under ${pkg.license} (${pkg.homepage}/blob/main/LICENSE)
 */`;
}

/** * @type {import('rollup').RollupOptions[]} */
const options = [
    {
        input: `src/index.ts`,
        output: [
            {
                file: `dist/index.d.ts`,
                format: 'es',
                sourcemap: ver.dev,
                banner: banner('Type definitions'),
            },
        ],
        plugins: [dts()],
    },
    {
        input: `src/index.ts`,
        output: [
            {
                file: `dist/index.js`,
                format: 'es',
                sourcemap: ver.dev,
                banner: banner('Package bundle'),
            },
        ],
        plugins: [typescript({ removeComments: true })],
    },
];

export default options;
