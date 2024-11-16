<script>
  // adapted from https://github.com/SauravKanchan/svelte-chartjs/issues/158#issuecomment-2456212827
  import {
    Chart,
    Tooltip,
  } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  import 'chart.js/auto';

  import { settings } from '$lib/stores/settings';
  import { isObject, mergeDeep } from '$lib/utils';

  let theme = $derived($settings.get('theme'));

  const { data, options, ...rest } = $props();

  Chart.register(Tooltip);

  let canvasElem;
  let chart;

  let getOpts = () => {
    let color = theme == 'light' ? '#000000' : '#ffffff';
    let opts = mergeDeep(options, {
      scales: {
        x: {
          ticks: {
            color
          },
          grid: {
            color: color + '50'
          }
        },
        y: {
          ticks: {
            color
          },
          grid: {
            color: color + '50'
          }
        }
      }
    })

    return opts;
  }

  $effect(() => {
    chart = new Chart(canvasElem, {
      type: 'line',
      data,
      options: getOpts(),
    });

    return () => {
      chart.destroy();
    };
  });

  $effect(() => {
    if (chart) {
      chart.data = data;
      chart.update();
    }
  });
</script>

<canvas bind:this={canvasElem} {...rest}></canvas>