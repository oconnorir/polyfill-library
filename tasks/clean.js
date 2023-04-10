'use strict';

const fs = require('graceful-fs');
const path = require('path');
const {promisify} = require('util');
const glob = promisify(require('glob'));
const TOML = require('@iarna/toml');
const cwd = path.join(__dirname, '../');
const globOptions = { cwd: cwd };
const rimraf = require('rimraf');

console.log('Cleaning polyfills...');
glob('polyfills/**/config.toml', globOptions).then((files) => {
	for (const config of files.map((source) => {
		try {
			return Object.assign({ src: source }, TOML.parse(fs.readFileSync(source, 'utf-8')));
		} catch (error) {
			throw new Error('Failed on ' + source + '. Error: ' + error);
		}
	})
	.filter((config) => {
		return 'install' in config;
	})) {
		if (config.install.clean && config.install.clean.length > 0) {
			const polyfillOutputFolder = path.dirname(config.src);

			for (const toClean of config.install.clean) {
				console.log(' * Removing ' + path.join(path.dirname(config.src), toClean));
				rimraf.sync(path.resolve(polyfillOutputFolder, toClean));
			}
		}
	}
}).then(() => {
	console.log('Polyfills cleaned successfully');
}).catch((error) => {
	console.log(error);
	// eslint-disable-next-line unicorn/no-process-exit
	process.exit(1);
});
