"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
var Alexa = require("ask-sdk-core");
var LaunchRequestHandler = {
    canHandle: function (handlerInput) {
        return (Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest");
    },
    handle: function (handlerInput) {
        var speakOutput = "Welcome, you can say Hello or Help. Which would you like to try?";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};
var HelloWorldIntentHandler = {
    canHandle: function (handlerInput) {
        return (Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === "HelloWorldIntent");
    },
    handle: function (handlerInput) {
        var speakOutput = "Hello World!";
        return (handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse());
    },
};
var HelpIntentHandler = {
    canHandle: function (handlerInput) {
        return (Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent");
    },
    handle: function (handlerInput) {
        var speakOutput = "You can say hello to me! How can I help?";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};
var CancelAndStopIntentHandler = {
    canHandle: function (handlerInput) {
        return (Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
            (Alexa.getIntentName(handlerInput.requestEnvelope) ===
                "AMAZON.CancelIntent" ||
                Alexa.getIntentName(handlerInput.requestEnvelope) ===
                    "AMAZON.StopIntent"));
    },
    handle: function (handlerInput) {
        var speakOutput = "Goodbye!";
        return handlerInput.responseBuilder.speak(speakOutput).getResponse();
    },
};
var SessionEndedRequestHandler = {
    canHandle: function (handlerInput) {
        return (Alexa.getRequestType(handlerInput.requestEnvelope) ===
            "SessionEndedRequest");
    },
    handle: function (handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    },
};
// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
var IntentReflectorHandler = {
    canHandle: function (handlerInput) {
        return (Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest");
    },
    handle: function (handlerInput) {
        var intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        var speakOutput = "You just triggered " + intentName;
        return (handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse());
    },
};
// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
var ErrorHandler = {
    canHandle: function () {
        return true;
    },
    handle: function (handlerInput, error) {
        console.log("~~~~ Error handled: " + error.stack);
        var speakOutput = "Sorry, I had trouble doing what you asked. Please try again.";
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    },
};
// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(LaunchRequestHandler, HelloWorldIntentHandler, HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler, IntentReflectorHandler // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
)
    .addErrorHandlers(ErrorHandler)
    .lambda();
