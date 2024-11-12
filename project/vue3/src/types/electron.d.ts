// types/electron.d.ts
export {};
declare global {
	interface Window {
		electronAPI?: {
			ping?: () => Promise<string>;
			setTitle?: (title: string) => void;
		}
	}
}
