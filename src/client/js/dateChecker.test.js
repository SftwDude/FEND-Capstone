import { checkValidDate } from './dateChecker'
import { TestScheduler } from 'jest'

test('test if new Date() is a valid date.', () => {
    const date = new Date();
    expect(checkValidDate(date)).toBe(true);
})