<template>
  <span>{{ formatted }}</span>
</template>

<script>
import {
  differenceInMinutes,
  differenceInSeconds,
  isSameDay,
  format
} from "date-fns";

const addPrefix = (prefix, join, formatted) =>
  prefix
    ? join
      ? `${prefix} ${join} ${formatted}`
      : `${prefix} ${formatted}`
    : formatted;

const formatTimestamp = (timestamp, prefix) => {
  const now = new Date();
  const date = timestamp.toDate();
  const seconds = differenceInSeconds(now, date);
  if (seconds < 60) {
    return addPrefix(
      prefix,
      null,
      `${seconds} second${seconds > 1 ? "s" : ""} ago`
    );
  }
  const minutes = differenceInMinutes(now, date);
  if (minutes < 60) {
    return addPrefix(
      prefix,
      null,
      `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    );
  }
  if (isSameDay(now, date)) {
    return addPrefix(prefix, "at", format(date, "HH:mm:ss"));
  }
  return addPrefix(prefix, "on", format(date, "YYYY-MM-DD [at] HH:mm:ss"));
};

export default {
  props: {
    timestamp: Object,
    prefix: String
  },
  computed: {
    formatted() {
      return formatTimestamp(this.timestamp, this.prefix);
    }
  }
};
</script>
