import _ from 'lodash'

export default {
  intro: {
    title: "Predicting Call Arrivals in Call Centers ✕ Optimize work schedule",
  },
  header: {
    date: _.template("<%= year %> / <%= month %>"),
    predict: "Predict of number of incoming calls",
    optimization: "Optimize work schedule",
  },
  main: {
    number: "No",
    name: "Name",
    numOfWorks: "Days",
    workingHours: "Times",
    numOfPredicted: "Predicted number",
  },
  popover: {
    allSchedule: "All Schedules",
    dateFormat: "M/D (dd)",
  },
  settings: {
    submit: "Optimize work schedule",
    cancel: "Cancel",
  },
}
