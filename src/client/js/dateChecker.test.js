import { checkValidDate } from './dateChecker'

test('test if new Date() is a valid date.', () => {
    const date = new Date();
    expect(checkValidDate(date)).toBe(true);
})