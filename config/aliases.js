const aliases = (prefix = `src`) => ({
  '@assets': `${prefix}/assets`,
  '@shared': `${prefix}/shared`,
  '@stores': `${prefix}/stores`,
});

module.exports = aliases;
