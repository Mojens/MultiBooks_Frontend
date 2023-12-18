const documentStyle = getComputedStyle(document.documentElement);
const textColor = documentStyle.getPropertyValue('--text-color');
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
export const graphOneOptions = {
  plugins: {
    legend: {
      labels: {
        color: textColor
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: textColorSecondary
      },
      grid: {
        color: surfaceBorder,
        drawBorder: false
      }
    },
    x: {
      ticks: {
        color: textColorSecondary
      },
      grid: {
        color: surfaceBorder,
        drawBorder: false
      }
    }
  }
};

export const circleOneOptions = {
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        color: textColor
      }
    }
  }
};

export const graphTwoOptions = {
  maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    legend: {
      labels: {
        color: textColor
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: textColorSecondary,
        font: {
          weight: 500
        }
      },
      grid: {
        color: surfaceBorder,
        drawBorder: false
      }
    },
    y: {
      ticks: {
        color: textColorSecondary
      },
      grid: {
        color: surfaceBorder,
        drawBorder: false
      }
    }

  }
};
