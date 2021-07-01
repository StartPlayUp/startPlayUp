import { checkPlace } from './YutFunctionModule'

const YUT_RESULT_TYPE = {
    BACK_DO: 0,
    DO: 1,
    GAE: 2,
    GIRL: 3,
    YUT: 4,
    MO: 5,
}

//https://velog.io/@ppohee/Jest-%EB%A1%9C-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%BD%94%EB%93%9C-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0

//https://jestjs.io/docs/getting-started

describe("side place test", () => {
    const nowPlace = 10;
    const list = [[9], [26], [27], [23], [28], [29]]
    Object.values(YUT_RESULT_TYPE).forEach((i, index) => {
        test(`checkPlace | nowPlace add ${i}`, () => {
            expect(checkPlace([], nowPlace, i)).toStrictEqual(list[index]);
        });
    });
})

describe("edge(15,23,20)) place test", () => {
    const nowPlace = [15, 23, 20];
    const list = [
        [[14, 25], [16], [17], [18], [19], [20]],
        [[22, 27], [28], [29], [20], [30], [30],],
        [[19, 29], [30], [30], [30], [30], [30],]
    ]
    for (let k = 0; k < nowPlace.length; k++) {
        Object.values(YUT_RESULT_TYPE).forEach((i, index) => {
            test(`checkPlace | nowPlace add ${i}`, () => {
                expect(checkPlace([], nowPlace[k], i)).toStrictEqual(list[k][index]);
            });
        });
    }
})