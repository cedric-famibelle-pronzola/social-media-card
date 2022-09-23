# Social Media Card

## Generate a card with your social media

### Required

- NodeJS 16+

- yarn or npm

### Copy env file and edit it

```
cp .env.sample .env
```

You can add more social media by editing the variable SOCIAL_MEDIA_LIST.
You must seprate words by comma : *SOCIAL_MEDIA_LIST=twitter,facebook,instagram,mastodon*

### Install dependencies
```
yarn
```

### Generate the json file with social media card content
```
yarn build-social-media-card-data
```

## Dev

```
yarn dev
```

## Production
```
yarn build
```
```
yarn start
```

The background and the avatar were here ⬇️

*`public/images/avatar.png` made with [Avataaars Generator](https://getavataaars.com/)*

*`public/images/background.jpg` by [hubgib](https://pixabay.com/fr/users/hubgib-511643/) from [Pixabay](https://pixabay.com/images/id-490843/)* (Beach and Diamond Rock, Martinique)

**You can replace theses files by yours**

___

By default, all links redirect to the framalibre site. You have to edit the json file with your profile url. Just change `profileUrl`.

The icons come from Fork Awesome. If an icon is missing in this library, the value of `customIcon` changes to `no-icon.png`. You must replace it with your icon. In this case, the file must be placed in the `public/images/icons` directory.
