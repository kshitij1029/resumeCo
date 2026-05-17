const mongoose = require('mongoose');

/**
 * -Job description schema : String
 * -Resume text : String
 * -Self description : String
 * 
 * -matchScore : Number
 * 
 * Technical Questions : [{question: String, answer: String, intention: String}]
 * -Behavioral Questions : [{question: String, answer: String, intention: String}]
 * -Skill gaps : [{skill: String, severity: {type: String, enum: ['Low', 'Medium', 'High']}}]
 * -Preparation plan : [{Day : Number, Focus: String, tasks: [String]}]
 */


/* Sub-schemas for technical questions, behavioral questions, skill gaps, and preparation plan */
const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    }
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Behavioral question is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    }
}, { _id: false });

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: {
        type: [String],
        default: []
    }
}, { _id: false });


/*  Main interview report schema */
const interviewReportSchema = new mongoose.Schema({
    jobDescription: 
    {
        type: String,
        required: [true, "Job description is required"]
    },
    resume : {
        type: String,
    },
    selfDescription : {
        type: String,
    },
    matchScore : {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions : {
        type: [technicalQuestionSchema],
    },
    behavioralQuestions : {
        type: [behavioralQuestionSchema],
    },
    skillGaps : {
        type: [skillGapSchema],
    },
    preparationPlan : {
        type: [preparationPlanSchema],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    
});

const interviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);
module.exports = interviewReportModel;