import React, { Component } from "react";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      jsonData: null, // New state to store the parsed JSON data
    };
  }

  handleFileSubmit = (event) => {
    event.preventDefault();
    const { file } = this.state;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const json = this.csvToJson(text);
        this.setState({ jsonData: json }); // Set JSON to state
        this.props.set_data(json);
      };
      reader.readAsText(file);
    }
  };

  csvToJson = (csv) => {
    const lines = csv.split("\n"); // Split by new line to get rows
    const headers = lines[0].split(","); // Split first row to get headers
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(","); // Split each line by comma
      const obj = {};

      // Map each column value to the corresponding header
      headers.forEach((header, index) => {
        obj[header.trim()] = currentLine[index]?.trim(); // Trim to remove spaces
      });

      // Add object to result if it's not an empty row
      if (Object.keys(obj).length && lines[i].trim()) {
        const parsedObj = {
          Age: parseInt(obj["Age"]),
          "Avg BPM": parseInt(obj["Avg BPM"]),
          BMI: parseFloat(obj["BMI"]),
          "BPM Diff": parseInt(obj["BPM Diff"]),
          "Calories Burned": parseInt(obj["Calories Burned"]),
          "Experience Level": parseInt(obj["Experience Level"]),
          "Fat Percentage": parseFloat(obj["Fat Percentage"]),
          Gender: obj["Gender"],
          "Height (m)": parseFloat(obj["Height (m)"]),
          "Max BPM": parseInt(obj["Max BPM"]),
          "Resting BPM": parseInt(obj["Resting BPM"]),
          "Session Duration (hours)": parseFloat(
            obj["Session Duration (hours)"]
          ),
          "Water Intake (liters)": parseFloat(obj["Water Intake (liters)"]),
          "Weight (kg)": parseFloat(obj["Weight (kg)"]),
          "Workout Frequency (days/week)": parseInt(
            obj["Workout Frequency (days/week)"]
          ),
          "Workout Type": obj["Workout Type"],
        };
        result.push(parsedObj);
      }
    }

    return result;
  };

  render() {
    return (
      <div style={{ backgroundColor: "#f0f0f0", padding: 20 }}>
        <h2>Upload a CSV File</h2>
        <form onSubmit={this.handleFileSubmit}>
          <input
            type="file"
            accept=".csv"
            onChange={(event) => this.setState({ file: event.target.files[0] })}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default FileUpload;
