import { func } from "@nmhillusion/n2mix/utils";

const { logObject, nfn, randomColor, suffle } = func;

let result: any = undefined;

test("test nfn", () => {
  result = [6, -6].map(nfn(Math.min, 2));
  logObject({ result });
  expect(result).toEqual([0, -6]);

  result = ["0", 1, "11", "101"].map(nfn(parseInt, 1));
  logObject({ result });
  expect(result).toEqual([0, 1, 11, 101]);

  result = [1, 2, 3, 4, 5, 6, 7, 8, 12].reduce(
    nfn(function sumEvenNumbers(current, newVal) {
      if (0 == newVal % 2) {
        return newVal + current;
      } else {
        return current;
      }
    }, 2),
    0
  );

  logObject({ result });
  expect(result).toBe(32);
});

test("test suffle", () => {
  const inpArr = [2, 1, 3, 7, 4];
  result = suffle(inpArr);
  logObject({ result });
  expect(result.length).toBe(5);
  inpArr.forEach((item) => {
    expect(result.includes(item)).toBe(true);
  });
});

test("test randomColor", () => {
  result = randomColor();
  logObject({ result });
  expect(Number.isNaN(Number(`0x${result.slice(1)}`))).toBe(false);
});
