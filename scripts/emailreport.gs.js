function spreadsheetToPDF(){

  var key = 'YOUR SPREADSHEET ID';  //docid

  var index = 0;  //sheet gid / number

  //   var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  //   Logger.log("Remaining email quota: " + emailQuotaRemaining);

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ActiveSheet = ss.getSheetByName('Sheet1');

  var year = Utilities.formatDate(new Date(), "GMT", "yyyy");
  var month = Utilities.formatDate(new Date(), "GMT", "MM");

  var filename = 'Page Speed Insights Score' + '_' + year + month + '.pdf';  //makes pdf filename

  SpreadsheetApp.flush();  //ensures everything on spreadsheet is "done"
  Logger.log("Start the pdf creation!");

  var theurl = 'https://docs.google.com/a/statsravingmad.com/spreadsheets/d/' // you can see this URL in the browser window
  + key
  + '/export?exportFormat=pdf&format=pdf'
  + '&size=legal'
  + '&portrait=false'
  + '&fitw=false'       // fit to width, false for actual size
  + '&sheetnames=false'
  + '&printtitle=false'
  + '&pagenumbers=false'
  + '&gridlines=false'
  + '&fzr=false'      // do not repeat frozen rows on each page
  + '&gid='
  + index;       //the sheet's Id

  //   Authorisation stuff...
  var token = ScriptApp.getOAuthToken();
  var docurl = UrlFetchApp.fetch(theurl, { headers: { 'Authorization': 'Bearer ' +  token } });
  var pdf = docurl.getBlob().setName(filename).getAs('application/pdf');
  var target = ['EMAIL 1' , 'EMAIL 2'] //example ['m.parzakonis@example.gr','m.parzakonis@example.com']


  // Save the file to folder on Drive
  var fid = 'YOUR FOLDER ID';
  var folder = DriveApp.getFolderById(fid);
  folder.createFile(pdf);
  //   folder.addViewers([m.parzakonis@example.com']); // add recipients as viewers in the folder. This will sent an email, so comment it out if it bothers you!


  // Send an email with attachment. Taken from https://developers.google.com/apps-script/reference/gmail/gmail-attachment
  var file = DriveApp.getFileById(key);
  MailApp.sendEmail(target, 'Page Speed Insight score report : ' + year + '-' + month, 'Please find attached the latest Page Speed Insight score report, for the ' + month + '\n\nAll previous reports are accecible in this link :' + folder.getUrl() +
  '\nUpdated at ' + file.getLastUpdated() , {
    name: 'Report Emailer Script',
    attachments: [file.getAs(MimeType.PDF)]
  });

}
