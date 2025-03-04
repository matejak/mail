<template>
	<div>
		<router-link to="/setup" class="icon-add-white app-settings-button button primary new-button">
			{{ t('mail', 'Add mail account') }}
		</router-link>

		<p v-if="loadingOptOutSettings" class="app-settings">
			<span class="icon-loading-small"></span>
			{{ text }}
		</p>
		<p v-else class="app-settings">
			<input
				id="data-collection-toggle"
				class="checkbox"
				type="checkbox"
				:checked="useDataCollection"
				@change="onToggleCollectData"
			/>
			<label for="data-collection-toggle">{{
				t(
					'mail',
					'Allow the app to collect data about your interactions. Based on this data, the app will adapt to your preferences. The data will only be stored locally.'
				)
			}}</label>
		</p>

		<p v-if="loadingAvatarSettings" class="app-settings avatar-settings">
			<span class="icon-loading-small"></span>
			{{ t('mail', 'Use Gravatar and favicon avatars') }}
		</p>
		<p v-else class="app-settings">
			<input
				id="gravatar-enabled"
				class="checkbox"
				type="checkbox"
				:checked="useExternalAvatars"
				@change="onToggleExternalAvatars"
			/>
			<label for="gravatar-enabled">{{ t('mail', 'Use Gravatar and favicon avatars') }}</label>
		</p>
		<p>
			<button class="icon-mail app-settings-button" @click="registerProtocolHandler">
				{{ t('mail', 'Register as application for mail links') }}
			</button>
		</p>
		<p class="icon-details app-settings-button button">
			<router-link :to="{name: 'keyboardShortcuts'}">
				{{ t('mail', 'Keyboard shortcuts') }}
			</router-link>
		</p>
	</div>
</template>

<script>
import Logger from '../logger'
import {generateUrl} from '@nextcloud/router'

export default {
	name: 'AppSettingsMenu',
	data() {
		return {
			loadingAvatarSettings: false,
			text: t(
				'mail',
				'Allow the app to collect data about your interactions. Based on this data, the app will adapt to your preferences. The data will only be stored locally.'
			),
			loadingOptOutSettings: false,
		}
	},
	computed: {
		useExternalAvatars() {
			return this.$store.getters.getPreference('external-avatars', 'true') === 'true'
		},
		useDataCollection() {
			return this.$store.getters.getPreference('collect-data', 'true') === 'true'
		},
	},
	methods: {
		onToggleExternalAvatars(e) {
			this.loadingAvatarSettings = true

			this.$store
				.dispatch('savePreference', {
					key: 'external-avatars',
					value: e.target.checked ? 'true' : 'false',
				})
				.catch((error) => Logger.error('could not save preferences', {error}))
				.then(() => {
					this.loadingAvatarSettings = false
				})
		},
		onToggleCollectData(e) {
			this.loadingOptOutSettings = true

			this.$store
				.dispatch('savePreference', {
					key: 'collect-data',
					value: e.target.checked ? 'true' : 'false',
				})
				.catch((error) => Logger.error('could not save preferences', {error}))
				.then(() => {
					this.loadingOptOutSettings = false
				})
		},
		registerProtocolHandler: function () {
			if (window.navigator.registerProtocolHandler) {
				var url =
					window.location.protocol + '//' + window.location.host + generateUrl('apps/mail/compose?uri=%s')
				try {
					window.navigator.registerProtocolHandler('mailto', url, OC.theme.name + ' Mail')
				} catch (err) {
					Logger.error('could not register protocol handler', {err})
				}
			}
		},
	},
}
</script>

<style scoped>
p.app-settings span.icon-loading-small {
	display: inline-block;
	vertical-align: middle;
	padding: 5px 0;
}
p.app-settings {
	padding: 10px 0;
}
.app-settings-button {
	display: block;
	padding-left: 34px;
	background-position: 10px center;
}
.app-settings-link {
	text-decoration: underline;
}
</style>
