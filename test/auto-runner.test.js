const { jobMaster } = require("../src");

describe("auto-runner", () => {
    it("should throw an error if cronExpression is incorrect!", () => {
        expect(() => jobMaster("wrong expr")).toThrow(/Wrong cron expression/)
    });

    it("should do job after calling start function", async () => {
        const mock = jest.fn();
        const runner = jobMaster("* * * * * *");
        runner.set("job", ()=> mock());
        runner.start();
        await new Promise(resolve => setTimeout(()=>{
            runner.stop();
            expect(mock).toHaveBeenCalled();
            resolve()
        }, 1100));
    })
})

