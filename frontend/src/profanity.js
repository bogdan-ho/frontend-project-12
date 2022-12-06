import leoProfanity from 'leo-profanity';

const initLeoProfanity = () => {
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));
};

export default initLeoProfanity;
