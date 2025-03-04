/*
 * @copyright 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2019 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import Vue from 'vue'
import Vuex from 'vuex'

import {
	UNIFIED_ACCOUNT_ID,
	UNIFIED_INBOX_ID,
	UNIFIED_INBOX_UID,
	PRIORITY_INBOX_ID,
	PRIORITY_INBOX_UID,
} from './constants'
import actions from './actions'
import {getters} from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		preferences: {},
		accounts: {
			[UNIFIED_ACCOUNT_ID]: {
				id: UNIFIED_ACCOUNT_ID,
				accountId: UNIFIED_ACCOUNT_ID,
				isUnified: true,
				folders: [PRIORITY_INBOX_UID, UNIFIED_INBOX_UID],
				collapsed: false,
				emailAddress: '',
				name: '',
			},
		},
		accountList: [UNIFIED_ACCOUNT_ID],
		folders: {
			[UNIFIED_INBOX_UID]: {
				id: UNIFIED_INBOX_ID,
				accountId: 0,
				isUnified: true,
				specialUse: ['inbox'],
				specialRole: 'inbox',
				unread: 0,
				folders: [],
				envelopeLists: {},
			},
			[PRIORITY_INBOX_UID]: {
				id: PRIORITY_INBOX_ID,
				accountId: 0,
				isPriorityInbox: true,
				specialUse: ['inbox'],
				specialRole: 'inbox',
				unread: 0,
				folders: [],
				envelopeLists: {},
			},
		},
		envelopes: {},
		messages: {},
		autocompleteEntries: [],
	},
	getters,
	mutations,
	actions,
})
