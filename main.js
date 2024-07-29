const { app, BrowserWindow, ipcMain } = require('electron/main');
const store = require('electron-store')
const path = require('node:path');
const fs = require('fs');
const http = require('http');
const https = require('https');
var child_process = require ("child_process");
//let mpv = require('node-mpv');
//let mpvPlayer = new mpv();

let storeWindow;
let mainWindow;
let modalWindow;
let action;
let parameter;
let value;

/**  SEZIONE DI GESTIONE FUNCTION DI DEFAULT DELL'APP */
const createWindow = () => {
	storeWindow = new store();
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 900,
		minWidth: 800,
		minHeight: 600,
		show: true,
		roundedCorners: true,
		scrollBounce: true,
		useContentSize: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,	
			preload: path.join(__dirname, 'js/preload.js'),
			webSecurity: true,
		} 
	})
	mainWindow.loadFile(path.join(__dirname, 'html/index.html'));
	mainWindow.setBounds(storeWindow.get('bounds'));
	mainWindow.on('close', () => {
		storeWindow.set('bounds', mainWindow.getBounds());
	});
}

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

/**
 * Downloads file from remote HTTP[S] host and puts its contents to the
 * specified location.
 */
async function download(action, filePath) {
	let url = 'http://tedesco.masterapp1.xyz/player_api.php?username=FABIANO4890&password=bYHJJ9XA5m&action=';
	url += action;
	const proto = !url.charAt(4).localeCompare('s') ? https : http;
	
	return new Promise((resolve, reject) => {
		const file = fs.createWriteStream(filePath);
		let fileInfo = null;

		const request = proto.get(url, response => {
			if (response.statusCode !== 200) {
				fs.unlink(filePath, () => {
					reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
				});
				return;
			}

			fileInfo = {
				mime: response.headers['content-type'],
				size: parseInt(response.headers['content-length'], 10),
			};

			response.pipe(file);
		});

		// The destination stream is ended by the time it's called
		file.on('finish', () => resolve(fileInfo));

		request.on('error', err => {
			fs.unlink(filePath, () => reject(err));
		});

		file.on('error', err => {
			fs.unlink(filePath, () => reject(err));
		});

		request.end();
	});
}

download("get_live_streams", path.join(app.getPath('userData'), 'live_streams.json'));
download("get_live_categories", path.join(app.getPath('userData'), 'live_categories.json'));

download("get_vod_streams", path.join(app.getPath('userData'), 'vod_streams.json'));
download("get_vod_categories", path.join(app.getPath('userData'), 'vod_categories.json'));

download("get_series", path.join(app.getPath('userData'), 'series.json'));
download("get_series_categories", path.join(app.getPath('userData'), 'series_categories.json'));

/**
 * ipcMain functions
 */
ipcMain.on('getJson', (event,data)=>{
	console.log('getJson');
	let filepath = path.join(app.getPath('userData')+'/'+data.filename+'.json');
	console.log(filepath);
	fs.readFile(filepath, 'utf8', (err, data) => {
		mainWindow.webContents.send('parseJson',data);
	});

});

ipcMain.on('setParameters', (event,data)=>{
	console.log('setParameters');
	console.log(data);
    action = data.action;
	parameter = data.parameter;
	value = data.value;
});

ipcMain.on('getInfo', (event)=>{
	let url = 'http://tedesco.masterapp1.xyz/player_api.php?username=FABIANO4890&password=bYHJJ9XA5m&action='+action+'&'+parameter+'='+value;
	console.log('getInfo');
	console.log(url);
	const proto = !url.charAt(4).localeCompare('s') ? https : http;
	return new Promise((resolve, reject) => {
		let request = proto.get(url, (response) => {
			if (response.statusCode !== 200) {
				console.error(`Did not get an OK from the server. Code: ${response.statusCode}`);
				response.resume();
				return;
			}
		
			let data = '';
		
			response.on('data', (chunk) => {
				data += chunk;
			});
		
			response.on('close', () => {
				mainWindow.webContents.send('parseJson',data);
			});
		});
	});
});

ipcMain.on('openModal', (event,url)=>{
    modalWindow = new BrowserWindow({
        width: 900,
        height: 800,
        minWidth: 400,
        minHeight: 300,        
        parent: mainWindow,
        modal: true,
        show: false,
        roundedCorners: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            allowRunningInsecureContent: true,		
			preload: path.join(__dirname, 'js/modal.js')
        } 

    });
    modalWindow.on('close', function(){
        modalWindow = null
    })
    modalWindow.loadURL(url);
    modalWindow.show()
});

ipcMain.on('changePage', (event,data)=>{
    mainWindow.loadFile('./html/'+data);
});

ipcMain.on('openVLC', (event,data)=>{
	// Spawn VLC
	console.log(data);
	var proc = child_process.spawn ("open -a VLC '"+data+"'", [], { shell: true });

	/*
	// Handle VLC error output (from the process' stderr stream)
	proc.stderr.on ("data", (data) => {
		console.error ("VLC: " + data.toString ());
	});

	// Optionally, also handle VLC general output (from the process' stdout stream)
	proc.stdout.on ("data", (data) => {
		console.log ("VLC: " + data.toString ());
	});

	// Finally, detect when VLC has exited
	proc.on ("exit", (code, signal) => {
		// Every code > 0 indicates an error.
		console.log ("VLC exited with code " + code);
	});
	*/
});

ipcMain.on('openVideo', (event,data)=>{

	let url = "http://tedesco.masterapp1.xyz/"+data.type+"/FABIANO4890/bYHJJ9XA5m/"+data.stream;
	console.log(url);
	var proc = child_process.spawn ("open -a VLC '"+url+"'", [], { shell: true });
	//mpvPlayer.load(url);
});