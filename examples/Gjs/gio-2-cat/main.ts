// SPDX-License-Identifier: MIT OR LGPL-2.0-or-later
// SPDX-FileCopyrightText: 2009 Red Hat, Inc.
// Based on https://gitlab.gnome.org/GNOME/gjs/-/blob/master/examples/gio-cat.js

/*
 * Make sure you have a non english locale installed, for example fr_FR and run
 * LANGUAGE=fr_FR gjs gettext.js
 * the label should show a translation of 'Print help'
 */

import './@types/Gjs/index.js';
import { byteArray as ByteArray } from './@types/Gjs/Gjs.js';
import GLib from './@types/Gjs/GLib-2.0.js';
import Gio from './@types/Gjs/Gio-2.0.js';

const loop = GLib.MainLoop.new(null, false);

function cat(filename: string) {
    const file = Gio.file_new_for_path(filename);
    file.load_contents_async(null, (obj, res) => {
        let contents: Uint8Array;
        try {
            contents = obj.load_contents_finish(res)[1];
        } catch (e) {
            logError(e);
            loop.quit();
            return;
        }
        print(ByteArray.toString(contents));
        loop.quit();
    });

    loop.run();
}

if (ARGV.length !== 1)
    printerr('Usage: gio-cat.js filename');
else
    cat(ARGV[0]);
