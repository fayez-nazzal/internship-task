# Front-end Internship Task

CMO Analysis tools for a supermarket.

Technologies used:
- React
- Material Ui
- Redux
- nivo

Key features:
- good performance - web workers, better renders, fast charting library.
- Light/Dark Theme - detects user preferred theme.
- Unit tests for some critical parts.
- Has some responsiveness to work on more screens.
- Good user experience.

## Screenshots
[![Dark theme screenshot](https://i.ibb.co/54YgRq2/sawa-sc-1.png "Dark theme screenshot")](https://i.ibb.co/54YgRq2/sawa-sc-1.png "Dark theme screenshot")


[![Light theme screenshot](https://i.ibb.co/zQQcNWm/sawa-sc-2.png "Light theme screenshot")](https://i.ibb.co/zQQcNWm/sawa-sc-2.png "Light theme screenshot")

## Running the web app.
1. Have yarn package manager installed, the package has a yarn.lock file so it is highly recommended over npm, to install yarn visit [their site](https://classic.yarnpkg.com/en/docs/install#windows-stable "their site"), note you also need to have npm to install yarn.
2. Clone the project.
3. Enter the project directory and run the command: `yarn`
4. When installation finishes, run `yarn start`
5. If the app did not open already, just open [http://localhost:3000/](http://localhost:3000/) in your browser.

Tested on Google chrome, Firefox.
Does not work on IE, it requires to have several polyfills & change some settings to do so.

you can also see if unit test pass by running `yarn test`

##### The data is random which mean that some charts doesn not look realistic.
