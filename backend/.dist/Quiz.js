"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const IoManager_1 = require("./managers/IoManager");
const PROBLEM_TIME_S = 20;
class Quiz {
    constructor(roomId) {
        this.roomId = roomId;
        this.hasStarted = false;
        this.problems = [];
        this.activeProblem = 0;
        this.users = [];
        this.currentState = "not_started";
    }
    addProblem(problem) {
        this.problems.push(problem);
        console.log(this.problems);
    }
    start() {
        this.hasStarted = true;
        this.setActiveProblem(this.problems[0]);
        console.log(this.problems);
    }
    setActiveProblem(problem) {
        problem.startTime = new Date().getTime();
        problem.submissions = [];
        IoManager_1.IoManager.getIo().emit("CHANGE_PROBLEM", {
            problem
        });
        // clear this if functions moves ahead
        setTimeout(() => {
            this.sendLeaderBoard();
        }, PROBLEM_TIME_S * 1000);
    }
    sendLeaderBoard() {
        const leaderBoard = this.getLeaderboard();
        IoManager_1.IoManager.getIo().to(this.roomId).emit("leaderboard", {
            leaderBoard
        });
    }
    next() {
        const io = IoManager_1.IoManager.getIo();
        this.activeProblem++;
        const problem = this.problems[this.activeProblem];
        if (problem) {
            this.setActiveProblem(problem);
        }
        else {
            // send final results here
            // io.emit("QUIZ_END",{
            //     problem
            // })
        }
    }
    genRandonString(length) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        var charLength = chars.length;
        var result = '';
        for (var i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
    addUser(name) {
        const id = this.genRandonString(7);
        this.users.push({
            id,
            name,
            points: 0
        });
        return id;
    }
    submit(userId, roomId, problemId, submission) {
        const problem = this.problems.find(x => x.id == problemId);
        const user = this.users.find(x => x.id === userId);
        if (!problem || !user) {
            return;
        }
        const existingSubmission = problem.submissions.find(x => x.userId === userId);
        if (existingSubmission) {
            return;
        }
        problem.submissions.push({
            problemId,
            userId,
            isCorrect: problem.answer === submission,
            optionSelected: submission
        });
        user.points += 1000 - 500 * (new Date().getTime() - problem.startTime) / PROBLEM_TIME_S;
    }
    getLeaderboard() {
        return this.users.sort((a, b) => a.points < b.points ? 1 : -1).splice(0, 20);
    }
    getCurrentState() {
        if (this.currentState === "not_started") {
            return {
                type: "not_started"
            };
        }
        if (this.currentState === "ended") {
            return {
                type: "ended",
                leaderboard: this.getLeaderboard()
            };
        }
        if (this.currentState === "leaderboard") {
            return {
                type: "leaderboard",
                leaderboard: this.getLeaderboard()
            };
        }
        if (this.currentState === "question") {
            const problem = this.problems[this.activeProblem];
            return {
                type: "question",
                problem
            };
        }
    }
}
exports.Quiz = Quiz;
