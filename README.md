# Interview Tracker (demo)

A small demo I built to practise automating a hiring workflow with Google Workspace. Candidates fill in a form, and the rest happens automatically: confirmation emails, status emails, and a dashboard of counts.

Demo project, sample data only. No real candidates.

## What it does

- A candidate applies through a Google Form (name, email, role, preferred interview slot).
- The moment they submit, they get a confirmation email and their status is set to Applied.
- When someone changes a candidate's Status in the sheet, the matching email goes out: Shortlisted, Interview booked (includes their slot) or Rejected.
- An Email sent column remembers which status was already emailed, so nobody gets the same email twice.
- A Dashboard tab counts candidates per status and per role, with a chart.

## Built with

Google Forms, Google Sheets, Google Apps Script (MailApp).

## How to set it up

1. Make a Google Form with 4 required questions, in this order: Full name, Email, Role applying for (dropdown), Preferred interview slot (dropdown).
2. In the Responses tab, link the form to a new Google Sheet.
3. In the sheet, add two columns after the form columns: F = Status, G = Email sent. Make F a dropdown with Applied, Shortlisted, Interview booked, Rejected.
4. Go to Extensions > Apps Script and paste in Code.gs from this repo.
5. Add two triggers (clock icon, Add Trigger):
   - sendConfirmation: From spreadsheet, On form submit
   - onStatusChange: From spreadsheet, On edit
6. Authorise the script when Google asks, then submit the form to test it.
7. For the dashboard, add a tab called Dashboard with COUNTIF formulas on the Status column (F) and a QUERY on the Role column (D), then insert a chart.

## Good to know

- The script reads the form answers by column position, so keep the columns in this order: Timestamp, Full name, Email, Role, Slot, Status, Email sent.
- The on-edit trigger has to be an installable trigger (step 5), a plain onEdit can't send emails.
- Apps Script has a daily email limit, fine for a demo, not for real hiring volume.
- Errors get written into the Email sent column instead of failing silently.

## What I'd add next

Calendar invites for booked interviews, and a reminder email the day before.
