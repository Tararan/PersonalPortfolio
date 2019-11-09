# PersonalPortfolio

#Readme

start project by running '**npm install**' for the first time

Run '**npm run dev**' for dev server

Run '**npm run prod**' to generate files ready for deployment

p.s. webpack and webpack-dev-server need to be installed globally ('npm install webpack webpack-dev-server -g')


## Mailings

All mail templates are located in `./mailings/src`

For dev you can run `npm run mailings:dev` for a simple browserSync server.

To inline all styles and build the production ready mail template run `npm run mailings:build`.  
This will move images and generates all relevant files to `./mailings/dist`
