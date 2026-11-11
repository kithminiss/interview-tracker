function sendConfirmation(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();

  try {
    // e.values is the new row as a list: [timestamp, name, email, role, slot]
    const name = e.values[1];
    const email = e.values[2];
    const role = e.values[3];
    const slot = e.values[4];

    const subject = 'We got your application: ' + role;
    const body =
      'Hi ' + name + ',\n\n' +
      'Thanks for applying for the ' + role + ' role. We have your application.\n' +
      'You picked ' + slot + ' as your preferred interview slot. ' +
      'We will email you again once we have looked through applications.\n\n' +
      'Demo project, sample data only.';

    MailApp.sendEmail(email, subject, body);

    // column F = Status, column G = Email sent
    sheet.getRange(row, 6).setValue('Applied');
    sheet.getRange(row, 7).setValue('Applied');
  } catch (err) {
    sheet.getRange(row, 7).setValue('ERROR: ' + err.message);
  }
}

function onStatusChange(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();
  const col = e.range.getColumn();

  // only react when the Status column (F) is edited, and not the header row
  if (col !== 6 || row === 1) return;

  try {
    const status = e.range.getValue();
    const lastEmailed = sheet.getRange(row, 7).getValue();

    // skip blank, Applied (script 1 handles that), or a status we already emailed
    if (!status || status === 'Applied' || status === lastEmailed) return;

    const name = sheet.getRange(row, 2).getValue();
    const email = sheet.getRange(row, 3).getValue();
    const role = sheet.getRange(row, 4).getValue();
    const slot = sheet.getRange(row, 5).getValue();

    let subject = '';
    let body = '';

    if (status === 'Shortlisted') {
      subject = 'Update on your application: ' + role;
      body = 'Hi ' + name + ',\n\n' +
        'Good news, we want to move your application for ' + role + ' forward. ' +
        'We will send you interview details soon.\n\n' +
        'Demo project, sample data only.';
    } else if (status === 'Interview booked') {
      subject = 'Your interview is booked: ' + role;
      body = 'Hi ' + name + ',\n\n' +
        'Your interview for ' + role + ' is booked for ' + slot + '. ' +
        'Reply to this email if you cannot make it.\n\n' +
        'Demo project, sample data only.';
    } else if (status === 'Rejected') {
      subject = 'Your application: ' + role;
      body = 'Hi ' + name + ',\n\n' +
        'Thanks for applying for ' + role + ' and for your time. ' +
        'We will not be moving forward this time.\n\n' +
        'Demo project, sample data only.';
    } else {
      return;
    }

    MailApp.sendEmail(email, subject, body);

    // remember which status we emailed, so it never sends twice
    sheet.getRange(row, 7).setValue(status);
  } catch (err) {
    sheet.getRange(row, 7).setValue('ERROR: ' + err.message);
  }
}






