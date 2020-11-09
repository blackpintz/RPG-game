import { sendData, retrieveData } from '../src/ScoreApi';

test('sending data', () => sendData('Rose', 600).then(data => {
  expect(data.result).toBe('Leaderboard score created correctly.');
}));

test('getting data', () => retrieveData().then(data => {
  expect(typeof data).toBe('object');
}));