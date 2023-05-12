<style>
	nav {
		background-color: #111;
		height: 5vh;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		padding-left: 10px;
		margin: 0;
		position: sticky;
		top: 0;
		left: 0;
	}

	nav > * {
		margin-right: 5px;
	}
</style>

<nav><a href="/">home</a><p>|</p><a href="/links">links</a></nav>

<slot />