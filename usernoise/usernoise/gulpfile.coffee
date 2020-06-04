gulp = require('gulp')
watch = require('gulp-watch')
gutil = require('gulp-util')
merge = require('deepmerge')

gulp.task 'build', ['webpack']

onWebpackBuild = ((done)->
	return ((err, stats)->
		if err
			console.log('Error', err)
		else
			console.log(stats.toString())
		done() if done
	)
)


buildEntries = (path, extension)->
	fs = require 'fs'
	entries = {}
	for entry in fs.readdirSync(path).filter((filename)-> filename.match(new RegExp("\.#{extension}$")))
		entries[entry.replace new RegExp("\.#{extension}$"), ''] = "#{path}/#{entry}"
	entries


buildWebpackConfig = ->
	entry: (buildEntries('./js', 'coffee'))
	module:
		loaders: [
			{test: /\.coffee$/, loader: "coffee-loader"},
			{test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate"}
			{test: /\.sass$/, loader: "css!autoprefixer-loader!sass?indentedSyntax"}
		]
	output:
		filename: "js/[name].js"
buildCSSConfig = ->
	entry: (buildEntries('./css', 'sass'))
	module:
		loaders: [
			{test: /\.sass$/, loader: "css!autoprefixer-loader!sass?indentedSyntax"}
		]
	output:
		filename: "css/[name].css"


gulp.task 'webpack', (done)->
	require('webpack')(buildWebpackConfig()).run(onWebpackBuild(done))
gulp.task 'webpack-watch', ->
	require('webpack')(buildWebpackConfig()).watch({aggregateTimeout: 300}, onWebpackBuild())
gulp.task 'css', (done)->
	autoprefixer = require('gulp-autoprefixer')
	sass = require('gulp-sass')
	return gulp.src('./css/usernoise.sass').pipe(sass())
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  })).pipe(gulp.dest('css'));
gulp.task 'gulp-watch', ->

gulp.task 'watch', ['gulp-watch', 'webpack-watch'], ->

gulp.task 'default', ['build', 'watch']
