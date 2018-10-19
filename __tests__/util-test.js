import { stepsNotEqual } from '../components/Util';

/*
Tester at util-metoden returnerer true for ulike
mengder skritt tatt og mål.
*/
test("Test difference between steps taken and goal", () => {
  expect(stepsNotEqual(4, 0)).toEqual(true);
});

/*
Tester at util-metoden returnerer false for ulike
mengder skritt tatt og mål.
*/
test("Test equal amounts of steps taken and goal", () => {
  expect(stepsNotEqual(0, 0)).toEqual(false);
});
