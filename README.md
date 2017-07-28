# Urban Airship cordova plugin for Windows 10+

## Install
### Ionic Cordova plugin
`$ ionic cordova plugin add https://github.com/nodes-frontend/cordova-plugin-urbanairship-windows.git`

## Usage
#### Ionic 2+
##### eg. in your `App.component.ts`:
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