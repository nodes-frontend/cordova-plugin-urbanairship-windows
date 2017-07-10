# Urban Airship cordova plugin for Windows 10+

## Disclaimer!
I found the lack of Urban Airship plugin support for Windows disturbing! Damnit those 3 people deserve UA suuport! So I decided to write this plugin myself.
The repo is still in development and this is a long learning process for myself, since I have never written a cordova plugin before. Any tips, PRs, comments are greatly appreciated!

## Install
`$ npm i cordova-plugin-urbanairship-windows --save`
### Ionic Cordova plugin
`$ ionic cordova plugin add https://github.com/krislm/cordova-plugin-urbanairship-windows.git`

## Usage
#### Ionic 2+
##### In your `App.component.ts`:
```
declare const UrbanAirshipWindows: any;

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnInit {

    ngOnInit() {

        let uaConfig = {key: 'YOUR_KEY',
                        secret: 'YOUR_SECRET',
                        production: false};

        UrbanAirshipWindows.init(uaConfig,
            (response) => console.log('UA setup!'),
            (error)    => console.error(error)
        )
    }

    private enableNotifications(enable: boolean) {
        UrbanAirshipWindows.setUserNotificationsEnabled(enable,
            (response) => console.log(res),
            (error)    => console.error(error)
        )
    }

    private setAlias(alias: string) {
        UrbanAirshipWindows.setAlias('42',
            (response) => console.log(res),
            (error)    => console.error(error)
        )
    }

}
```