import { Selector } from 'testcafe';

fixture('Node Jobs')
  .page('http://localhost:3000');
 
const title = Selector('h1');
const tableRows = Selector('tbody > tr');
const addJobButton = Selector('a.btn.btn-primary');
const firstJob = Selector('tbody > tr').withText('Horse Whisperer');
const submitButton = Selector('button[type="submit"]');
const updateButton = Selector('a.btn.btn-warning.btn-sm');

test('All Jobs', async (t) => {
	await t
		.expect(title.innerText).eql('All Jobs')
		.expect(addJobButton.innerText).eql('Add New Job')
		.expect(tableRows.count).eql(3)
		.expect(firstJob.exists).ok();
});

test('New Job', async (t) => {
	// click
	await t
		.click(addJobButton)
		.expect(title.innerText).eql('Add Job')

	// fill in form
	await t
    .typeText('input[name="title"]', 'Angular Developer')
	.typeText('textarea[name="description"]', 'Angular 6 Developer')
	.typeText('input[name="company"]', 'ng')
	.typeText('input[name="email"]', 'applicant@ng.io')
	.click(submitButton);
});

test('Update Job', async (t) => {
	// click button
	await t
		.click(updateButton)
		.expect(title.innerText).eql('Update Job');

	// fill in form
	await t
		.typeText('input[name="title"]', 'testing an update', {replace: true})
		.typeText('textarea[name="description"]', 'test', {replace: true})
		.typeText('input[name="company"]', 'test', {replace: true})
		.typeText('input[name="email"]', 't@t.com', {replace: true})
		.click(submitButton)

	// check table is updated
	await t
		.expect(title.innerText).eql('All Jobs')
		.expect(tableRows.count).eql(4)
		.expect(firstJob.exists).notOk()
		.expect(Selector('tbody > tr').withText('testing an update').exists).ok();
});
