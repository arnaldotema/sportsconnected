/**
 * (c) Copyright Reserved EVRYTHNG Limited 2019.
 * All rights reserved. Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 *
 */

"use strict";

exports.api = require("supertest")(require("../../lib/app").app);
