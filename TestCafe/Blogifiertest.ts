import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

const URL = 'http://185.196.21.189:9888';
fixture`Admin register test`
    .page`${URL}/admin/register`;

// Random email. Not 100% safe since there is a chance even though it is small for the same email to be generated.
var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
var string = '';
for (var i = 0; i < 15; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
}

var email = string + '@gmail.com';
test('Blogifier Create admin test', async t => {

    // Saving selector constants.
    const registerEmail = Selector('#registerEmail');
    const registerName = Selector('#registerName');
    const registerPassword = Selector('#registerPassword');
    const registerConfirmPassword = Selector('#registerConfirmPassword');
    const registerButton = Selector('#createAdminAccountButton')

    // Registrate user.
    await t
        .typeText(registerEmail, email).expect(registerEmail.value).eql(email);
    await t
        .typeText(registerName, 'Thomas').expect(registerName.value).eql('Thomas');
    await t
        .typeText(registerPassword, 'helloWorld').expect(registerPassword.value).eql('helloWorld');
    await t
        .typeText(registerConfirmPassword, 'helloWorld').expect(registerConfirmPassword.value).eql('helloWorld');


    // Checking is passwords match.
    const confirmedPassword = await registerConfirmPassword.value;
    await t
        .expect(registerPassword.value).eql(confirmedPassword, 'Passwords has to match.');

    // Checking for fields not being empty.
    await t
        .expect(registerName.value).notEql('', 'Name has to be entered');
    await t
        .expect(registerEmail.value).notEql('', 'Email has to be entered');
    await t
        .expect(registerPassword.value).notEql('', 'Password has to be entered');
    await t
        .expect(registerConfirmPassword.value).notEql('', 'Confirm password has to be entered').takeScreenshot();

    // Clicking register button
    await t
        .click(registerButton);

    // Save location of page
    const getLocation = ClientFunction(() => document.location.href);
    // Check if page has changed to login
    await t
        .expect(getLocation()).contains(`${URL}/admin/login`, {timeout: 5000}).takeScreenshot();

    // One liner instead.
    // await t
    //     .expect(ClientFunction(() => document.location.href)()).contains('http://localhost:5000/admin/login');


});

fixture`Admin login test`
    .page`${URL}/admin/login`;
test('Blogifier login test', async t => {
    const loginEmail = Selector('#loginEmail');
    const password = Selector('#loginPassword');
    const loginButton = Selector('#loginButton');
    
    // Setting login credentials
    await t
        .typeText(loginEmail, email).expect(loginEmail.value).eql(email);
    await t
        .typeText(password, 'helloWorld').expect('helloWorld').eql('helloWorld').takeScreenshot();

    // Clicking register button
    await t
        .click(loginButton);
    
    // Save location of page
    const getLocation = ClientFunction(() => document.location.href);
    
    // Check if page has changed to login
    await t
        .expect(getLocation()).contains(`${URL}/admin`, {timeout: 5000}).takeScreenshot();
});