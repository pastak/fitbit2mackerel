# fitbit2mackerel

Post Fitbit data to mackerel.io.

inspired by [hitode909/vital2mackerel](https://github.com/hitode909/vital2mackerel)

[![https://gyazo.com/fd47b890fd80e8004fe2dce440a0c2bf](https://i.gyazo.com/fd47b890fd80e8004fe2dce440a0c2bf.png)](https://gyazo.com/fd47b890fd80e8004fe2dce440a0c2bf)

[![https://gyazo.com/808a0a749bacd39dec7f6d7e77a2a9de](https://i.gyazo.com/808a0a749bacd39dec7f6d7e77a2a9de.png)](https://gyazo.com/808a0a749bacd39dec7f6d7e77a2a9de)

# Setup

- `$ mv config.sample.js config.js` and fill in.
- `$ npm install`
- `$ node index.js` then post to mackerel.
  - It is good to set in crontab `* * * * * node /path/to/dir/index.js`
