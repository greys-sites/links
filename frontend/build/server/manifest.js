const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","styles.css"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.f52ad53b.js","app":"_app/immutable/entry/app.6f4b6a6a.js","imports":["_app/immutable/entry/start.f52ad53b.js","_app/immutable/chunks/index.9c9e698c.js","_app/immutable/chunks/singletons.b7483f1b.js","_app/immutable/chunks/index.a7151f55.js","_app/immutable/chunks/parse.d12b0d5b.js","_app/immutable/entry/app.6f4b6a6a.js","_app/immutable/chunks/index.9c9e698c.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-e021460e.js'),
			() => import('./chunks/1-4c31cf13.js'),
			() => import('./chunks/2-f366e25e.js'),
			() => import('./chunks/3-5946ed31.js'),
			() => import('./chunks/4-5b1fe1d0.js'),
			() => import('./chunks/5-7040a608.js'),
			() => import('./chunks/6-e5ae86c0.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dash",
				pattern: /^\/dash\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/links",
				pattern: /^\/links\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/[hid]",
				pattern: /^\/([^/]+?)\/?$/,
				params: [{"name":"hid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
