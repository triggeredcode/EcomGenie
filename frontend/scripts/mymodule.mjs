import {
    flattenObject
} from "./chunk-6QGXWNS5.mjs";

// src/telemetry/telemetry-client.ts
import { Analytics } from "@segment/analytics-node";
// import { randomUUID } from "crypto";
import { v4 as randomUUID } from 'uuid';
var TelemetryClient = class {
    constructor({
        packageName,
        packageVersion,
        telemetryDisabled,
        telemetryBaseUrl,
        sampleRate
    }) {
        this.globalProperties = {};
        this.cloudConfiguration = null;
        this.telemetryDisabled = false;
        this.sampleRate = 0.05;
        this.anonymousId = `anon_${randomUUID()}`;
        this.packageName = packageName;
        this.packageVersion = packageVersion;
        this.telemetryDisabled = telemetryDisabled || process.env.COPILOTKIT_TELEMETRY_DISABLED === "true" || process.env.COPILOTKIT_TELEMETRY_DISABLED === "1" || process.env.DO_NOT_TRACK === "true" || process.env.DO_NOT_TRACK === "1";
        if (this.telemetryDisabled) {
            return;
        }
        this.setSampleRate(sampleRate);
        const writeKey = process.env.COPILOTKIT_SEGMENT_WRITE_KEY || "n7XAZtQCGS2v1vvBy3LgBCv2h3Y8whja";
        this.segment = new Analytics({
            writeKey
        });
        this.setGlobalProperties({
            "copilotkit.package.name": packageName,
            "copilotkit.package.version": packageVersion
        });
    }
    shouldSendEvent() {
        const randomNumber = Math.random();
        return randomNumber < this.sampleRate;
    }
    async capture(event, properties) {
        if (!this.shouldSendEvent() || !this.segment) {
            return;
        }
        const flattenedProperties = flattenObject(properties);
        const propertiesWithGlobal = {
            ...this.globalProperties,
            ...flattenedProperties
        };
        const orderedPropertiesWithGlobal = Object.keys(propertiesWithGlobal).sort().reduce(
            (obj, key) => {
                obj[key] = propertiesWithGlobal[key];
                return obj;
            },
            {}
        );
        this.segment.track({
            anonymousId: this.anonymousId,
            event,
            properties: { ...orderedPropertiesWithGlobal }
        });
    }
    setGlobalProperties(properties) {
        const flattenedProperties = flattenObject(properties);
        this.globalProperties = { ...this.globalProperties, ...flattenedProperties };
    }
    setCloudConfiguration(properties) {
        this.cloudConfiguration = properties;
        this.setGlobalProperties({
            cloud: {
                publicApiKey: properties.publicApiKey,
                baseUrl: properties.baseUrl
            }
        });
    }
    setSampleRate(sampleRate) {
        let _sampleRate;
        _sampleRate = sampleRate ?? 0.05;
        if (process.env.COPILOTKIT_TELEMETRY_SAMPLE_RATE) {
            _sampleRate = parseFloat(process.env.COPILOTKIT_TELEMETRY_SAMPLE_RATE);
        }
        if (_sampleRate < 0 || _sampleRate > 1) {
            throw new Error("Sample rate must be between 0 and 1");
        }
        this.sampleRate = _sampleRate;
        this.setGlobalProperties({
            sampleRate: this.sampleRate,
            sampleRateAdjustmentFactor: 1 - this.sampleRate
        });
    }
};

export {
    TelemetryClient
};
//# sourceMappingURL=chunk-ZUUDJSVP.mjs.map