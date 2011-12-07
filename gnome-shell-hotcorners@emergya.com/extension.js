/**
 * extension.js
 * Copyright (C) 2011, Junta de Andalucía <devmaster@guadalinex.org>
 *
 * This file is part of Guadalinex
 *
 * This software is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * As a special exception, if you link this library with other files to
 * produce an executable, this library does not by itself cause the
 * resulting executable to be covered by the GNU General Public License.
 * This exception does not however invalidate any other reasons why the
 * executable file might be covered by the GNU General Public License.
 *
 * Author: Antonio Hernández <ahernandez@emergya.com>
 *
 */

const St = imports.gi.St;
const Main = imports.ui.main;
const Panel = imports.ui.panel;
const Lang = imports.lang;
const BoxPointer = imports.ui.boxpointer;
const MessageTray = imports.ui.messageTray;
const LookingGlass = imports.ui.lookingGlass;
const PopupMenu = imports.ui.popupMenu;
const AltTab = imports.ui.altTab;

const Side = {
    HIDDEN: 0,
    SHOWN: 1,
    TOP: 2,
    BOTTOM: 3,
    LEFT: 4,
    RIGHT: 5
};

const UPDATE_HOT_CORNERS = Side.HIDDEN;

/**
 * Move the hot corners to the bottom of the screen
 * or hide them.
 *
 * See UPDATE_HOT_CORNERS constant, some people may want the
 * HotCorner feature back.
 */
function updateHotCorners() {

    Main.layoutManager._updateHotCorners = function() {

        Main.layoutManager.__proto__._updateHotCorners.call(this);

        let cornerX = null;
        let cornerY = null;

        if (UPDATE_HOT_CORNERS == Side.TOP) {

            return;

        } else if (UPDATE_HOT_CORNERS == Side.BOTTOM) {


            // TODO: Currently the animated graphic is not shown.
            // TODO: Currently only handles the primary monitor.
            let primary = Main.layoutManager.primaryMonitor;
            cornerX = 0;
            cornerY = primary.height - 1;

        } else if (UPDATE_HOT_CORNERS == Side.HIDDEN) {

            for (let i = 0; i < this._hotCorners.length; i++) {
                this._hotCorners[i].destroy();
            }
            this._hotCorners = [];

            return;
        }

        try {
            for (let i = 0; i < this._hotCorners.length; i++) {
                let corner = this._hotCorners[i];
                corner.actor.set_position(cornerX, cornerY);
            }
        } catch(e) {
            Logger.error(e);
        }

    };

    global.screen.emit('monitors-changed');
}

function main(meta) {
    updateHotCorners();
}

function init(meta) {
}

function enable(meta) {
    main(meta);
}

function disable() {
}
