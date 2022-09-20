# ReactNativeBase

### Technology
- [React Native](https://reactnative.dev/) - v0.68.1
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation V6](https://redux-toolkit.js.org/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Hermes Engine](https://hermesengine.dev/)

### Structure
- `src` Main source code
    - `assets` include all assets like image, video, font, ...
    - `components` include all components, exported by index.ts
    - `configs` include all config link API Domain, userData,..., exported by index.ts
    - `constants` include all const link Color declaration, Font declaration,...
    - `helpers` include all common functions
    - `hooks` include all hook functions like useDispatch, useSelector,...
    - `log` include log functions
    - `models` include models interface like API input, response,...
    - `redux`
        - `api` include api functions
        - `reducer` include all reducer declaration
        - `store.ts` include app store declaration
    - `routes` include all screen routes
        - `routes.ts` declare all route name and route params
        - `type.ts` declare Navigation Props TypeScript
    - `screen` include all screen by module
    - `styles` include all common styles

### Coding convention
- Không sửa file .prettierrc.js
- Đặt tên file, tên biến: 
    + Component, Screen, Class, Component file, Screen file: [PascalCase]
    + function, variable, file: [camelCase]
- Tất cả assets phải được import vào trong folder assets, khai báo trong constants folder

### Đối với miniapp

- Phải sử dụng `BaseImage` đối với tất cả hình ảnh sử dụng trong app 
    + Tất cả assets (image, video, ...) phải được đặt trong assets folder assets/images/, assets/videos/, miniapp/miniapp1/assets/images
    + Cấu hình đường dẫn của các assets trong file {...}/configs/appConfigs ASSET_IMAGE_PATH, ASSET_VIDEO_PATH,...
    + ASSET_IMAGE_PATH của main app: ["/assets/src/assets/images/"]
    + ASSET_IMAGE_PATH của mini app 1: ["/assets/src/miniapp/miniapp1/src/assets/images/"]
    + Tất cả ảnh phải được thêm vào bằng file, nếu dùng ảnh từ thư viện phải thêm 1 cấu hình riêng đường dẫn cho file build trong {...}/configs/appConfigs
    + Sử dụng component BaseImage cho tất cả các hình ảnh sử dụng trong app

- Hình ảnh khai báo bao gồm 
    ```
    let IMAGE = {
        test: {
            path: require('../assets/images/test.png'),
            name: 'test.png',
        },
        test2: {
            path: require('../assets/images/test2.png'),
            name: 'test2.png',
        },
        test3: {
            path: require('../assets/images/test3.png'),
            name: 'test3.png',
        },
    };
    ```
- Hình ảnh khai báo trong constants/Image.ts phải export bằng funtion convertImage
    ```
    import { BUNDLE_DOMAIN, ASSET_IMAGE_PATH } from './../configs/appConfig';

    let IMAGE = {
    test: {
        path: require('../assets/images/test.png'),
        name: 'test.png',
    },
    test2: {
        path: require('../assets/images/test2.png'),
        name: 'test2.png',
    },
    test3: {
        path: require('../assets/images/test3.png'),
        name: 'test3.png',
    },
    };

    let convertImage: Function = () => {
    let result: Object = {};
    for (const key in IMAGE) {
        if (Object.prototype.hasOwnProperty.call(IMAGE, key)) {
        let image = IMAGE[key];
        if (__DEV__) {
            Object.assign(result, { [key]: image.path });
        } else {
            Object.assign(result, {
            [key]: BUNDLE_DOMAIN + ASSET_IMAGE_PATH + image.name,
            });
        }
        }
    }
    return result;
    };

    IMAGE = convertImage();

    export default IMAGE;

    ```



