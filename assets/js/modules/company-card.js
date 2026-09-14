import {
  companyData
} from './company-data.js';

export function renderCompanyCard() {
  const container = document.getElementById('company-card-body');
  if (!container) return;
  let html = '';

  companyData.sections.forEach((section) => {
    html += `
      <div class="card-section">
        <h2 class="card-section__title">${section.title}</h2>
        <div class="card-grid">
    `;

    section.fields.forEach((field) => {
      const valueContent = field.isLink ?
        `<a href="${field.href}" target="_blank" class="text-link">${field.value}</a>` :
        field.value;

      html += `
        <div class="info-group">
          <span class="info-group__label">${field.label}:</span>
          <span class="info-group__value">${valueContent}</span>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  html += `
    <div class="card-section card-section--okved">
      <h2 class="card-section__title">${companyData.okved.title}</h2>
      <div class="data-table">
  `;

  companyData.okved.items.forEach((item) => {
    html += `
      <div class="data-row">
        <div class="data-code">${item.code}</div>
        <div class="data-name">${item.name}</div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

export function getFormattedCompanyText() {
  let text = `# ИП Пугин Евгений Александрович – карточка организации\n\n`;

  companyData.sections.forEach((section) => {
    text += `## ${section.title}\n\n`;
    section.fields.forEach((f) => {
      text += `${f.label}: ${f.value}\n`;
    });
    text += `\n`;
  });

  text += `${companyData.okved.title}\n`;
  companyData.okved.items.forEach((item) => {
    text += `${item.code} ${item.name}\n`;
  });

  return text.trim();
}

export function exportToPdf() {
  window.print();
}

export async function exportToDocx() {
  const btn = document.getElementById('btn-export-docx');
  const tooltip = btn?.querySelector('.tooltip');
  const originalTooltipText = tooltip ? tooltip.innerText : 'DOCX';
  if (tooltip) tooltip.innerText = 'Создание...';

  try {
    // Подгружаем библиотеку docx динамически прямо в браузере (только при клике!)
    const docxModule = await import('https://esm.sh/docx@9.0.3');
    const {
      Document,
      Packer,
      Paragraph,
      TextRun,
      Table,
      TableRow,
      TableCell,
      WidthType,
      BorderStyle,
      HeadingLevel
    } = docxModule;

    const thinBorder = {
      style: BorderStyle.SINGLE,
      size: 4,
      color: 'CBD5E1'
    };
    const borders = {
      top: thinBorder,
      bottom: thinBorder,
      left: BorderStyle.NONE,
      right: BorderStyle.NONE
    };

    const docChildren = [
      new Paragraph({
        text: 'КАРТОЧКА ОРГАНИЗАЦИИ',
        heading: HeadingLevel.TITLE,
        spacing: {
          after: 300
        }
      })
    ];

    // Разделы реквизитов
    companyData.sections.forEach((section) => {
      docChildren.push(
        new Paragraph({
          children: [
            new TextRun({
              text: section.title.toUpperCase(),
              bold: true,
              color: '4338CA',
              size: 20
            })
          ],
          spacing: {
            before: 240,
            after: 120
          }
        })
      );

      const rows = section.fields.map((field) => {
        return new TableRow({
          children: [
            new TableCell({
              width: {
                size: 3200,
                type: WidthType.DXA
              },
              children: [
                new Paragraph({
                  children: [new TextRun({
                    text: field.label + ':',
                    bold: true,
                    color: '64748B',
                    size: 18
                  })]
                })
              ],
              borders
            }),
            new TableCell({
              width: {
                size: 6000,
                type: WidthType.DXA
              },
              children: [
                new Paragraph({
                  children: [new TextRun({
                    text: field.value,
                    bold: true,
                    color: '0F172A',
                    size: 18
                  })]
                })
              ],
              borders
            })
          ]
        });
      });

      docChildren.push(new Table({
        width: {
          size: 9200,
          type: WidthType.DXA
        },
        rows
      }));
    });

    // Раздел ОКВЭД
    docChildren.push(
      new Paragraph({
        children: [
          new TextRun({
            text: companyData.okved.title.toUpperCase(),
            bold: true,
            color: '4338CA',
            size: 20
          })
        ],
        spacing: {
          before: 300,
          after: 120
        }
      })
    );

    const okvedRows = companyData.okved.items.map((item) => {
      return new TableRow({
        children: [
          new TableCell({
            width: {
              size: 1800,
              type: WidthType.DXA
            },
            children: [
              new Paragraph({
                children: [new TextRun({
                  text: item.code,
                  bold: true,
                  color: '0F172A',
                  size: 18
                })]
              })
            ],
            borders
          }),
          new TableCell({
            width: {
              size: 7400,
              type: WidthType.DXA
            },
            children: [
              new Paragraph({
                children: [new TextRun({
                  text: item.name,
                  color: '334155',
                  size: 18
                })]
              })
            ],
            borders
          })
        ]
      });
    });

    docChildren.push(new Table({
      width: {
        size: 9200,
        type: WidthType.DXA
      },
      rows: okvedRows
    }));

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000
            }
          }
        },
        children: docChildren
      }]
    });

    // Формируем настоящий бинарный .docx и скачиваем
    const blob = await Packer.toBlob(doc);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Карточка-организации-ИП-Пугин-ЕА.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (err) {
    console.error('Ошибка создания DOCX:', err);
    alert('Не удалось сформировать файл DOCX.');
  } finally {
    if (tooltip) tooltip.innerText = originalTooltipText;
  }
}

export function initCompanyCard() {
  renderCompanyCard();

  const copyBtn = document.getElementById('btn-copy-data');
  const copyTooltip = document.getElementById('copy-tooltip');

  copyBtn?.addEventListener('click', () => {
    const textToCopy = getFormattedCompanyText();
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (copyTooltip) {
        const originalText = copyTooltip.innerText;
        copyTooltip.innerText = 'Скопировано!';
        setTimeout(() => {
          copyTooltip.innerText = originalText;
        }, 2000);
      }
    });
  });

  document.getElementById('btn-export-pdf')?.addEventListener('click', exportToPdf);
  document.getElementById('btn-export-docx')?.addEventListener('click', exportToDocx);
}
