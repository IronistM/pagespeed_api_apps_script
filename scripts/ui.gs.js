function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Query",
    functionName : "pageSpeedInsights"
    },
    {name : "Email report",
    functionName : "spreadsheetToPDF"}
    ];
    sheet.addMenu("Page Speed Insights", entries);
  };
