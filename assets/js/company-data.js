const companyData = {
  sections: [
    {
      id: "general",
      title: "Общие сведения",
      fields: [
        { label: "Полное наименование", value: "Индивидуальный предприниматель Пугин Евгений Александрович" },
        { label: "Сокращённое наименование", value: "ИП Пугин Е.А." },
        { label: "ИНН", value: "780516889552" },
        { label: "ОГРНИП", value: "326784700234590" },
        { label: "ОКПО", value: "2053518693" },
        { label: "Система налогообложения", value: "УСН (без НДС)" },
        { label: "Официальный сайт", value: "pugin-group.ru", isLink: true, href: "https://pugin-group.ru" },
        { label: "Адрес регистрации", value: "193230, г. Санкт-Петербург, Дыбенко ул., дом 8, корп. 2, стр. 1, кв./офис 12" }
      ]
    },
    {
      id: "bank",
      title: "Банковские реквизиты",
      fields: [
        { label: "Банк", value: "ООО «Банк Точка»" },
        { label: "БИК", value: "044525104" },
        { label: "Город", value: "г. Москва" },
        { label: "Корреспондентский счёт", value: "30101810745374525104" },
        { label: "Расчётный счёт", value: "40802810720001055563" }
      ]
    },
    {
      id: "edo",
      title: "Электронный документооборот (ЭДО)",
      fields: [
        { label: "Оператор ЭДО", value: "АО «Точка»" },
        { label: "Идентификатор участника ЭДО", value: "2MH019F9302844C7967B541ACE9C7F912A4" }
      ]
    },
    {
      id: "contacts",
      title: "Контактные данные",
      fields: [
        { label: "Адрес электронной почты", value: "eugenepugin@yandex.ru" },
        { label: "Контактный телефон", value: "+7 (921) 798-87-25" }
      ]
    }
  ],
  okved: {
    title: "Виды деятельности (ОКВЭД)",
    items: [
      { code: "62.01", name: "Разработка компьютерного программного обеспечения" },
      { code: "63.11.1", name: "Деятельность по созданию и использованию баз данных и информационных ресурсов" },
      { code: "63.11", name: "Деятельность по обработке данных, предоставление услуг по размещению информации и связанная с этим деятельность" },
      { code: "62.03.13", name: "Деятельность по сопровождению компьютерных систем" },
      { code: "62.02.4", name: "Деятельность по подготовке компьютерных систем к эксплуатации" },
      { code: "62.02.1", name: "Деятельность по планированию, проектированию компьютерных систем" },
      { code: "58.11.2", name: "Издание книг, брошюр, рекламных буклетов и аналогичных изданий, включая издание словарей и энциклопедий на электронных носителях" }
    ]
  }
};

function renderCompanyCard() {
  const container = document.getElementById('company-card-body');
  if (!container) return;
  let html = '';

  // Обычные секции
  companyData.sections.forEach(section => {
    html += `
      <div class="card-section">
        <h2 class="card-section__title">${section.title}</h2>
        <div class="card-grid">
    `;

    section.fields.forEach(field => {
      const valueContent = field.isLink
        ? `<a href="${field.href}" target="_blank" class="text-link">${field.value}</a>`
        : field.value;

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

  // Таблица ОКВЭД
  html += `
    <div class="card-section card-section--okved">
      <h2 class="card-section__title">${companyData.okved.title}</h2>
      <div class="data-table">
  `;

  companyData.okved.items.forEach(item => {
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

function getFormattedCompanyText() {
  let text = `# ИП Пугин Евгений Александрович – карточка организации\n\n`;

  companyData.sections.forEach(section => {
    text += `## ${section.title}\n\n`;
    section.fields.forEach(f => {
      text += `${f.label}: ${f.value}\n`;
    });
    text += `\n`;
  });

  text += `${companyData.okved.title}\n`;
  companyData.okved.items.forEach(item => {
    text += `${item.code} ${item.name}\n`;
  });

  return text.trim();
}

function exportToPdf() {
  window.print();
}

function exportToDocx() {
  const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  const docxColors = {
    mainText: getCssVar('--text-main') || '#000000',
    indigo: getCssVar('--color-indigo') || '#6366F1',
    muted: getCssVar('--text-muted') || '#475569',
    border: getCssVar('--border-color') || '#CBD5E1'
  };

  let bodyContent = `
    <h1 style="font-size:18pt; color:${docxColors.mainText}; margin-bottom:4pt;">Карточка организации</h1>
  `;

  companyData.sections.forEach(sec => {
    bodyContent += `<h2 style="font-size:11pt; color:${docxColors.indigo}; margin-top:14pt; margin-bottom:8pt; text-transform:uppercase; border-bottom:1px solid ${docxColors.border}; padding-bottom:4pt;">${sec.title}</h2>`;
    bodyContent += `<table style="width:100%; border-collapse:collapse; margin-bottom:12pt;">`;
    sec.fields.forEach(f => {
      bodyContent += `
        <tr>
          <td style="padding:4pt 0; font-size:8.5pt; font-weight:bold; color:${docxColors.muted}; width:200pt; text-transform:uppercase;">${f.label}:</td>
          <td style="padding:4pt 0; font-size:10.5pt; font-weight:bold; color:${docxColors.mainText};">${f.value}</td>
        </tr>
      `;
    });
    bodyContent += `</table>`;
  });

  bodyContent += `<h2 style="font-size:11pt; color:${docxColors.indigo}; margin-top:14pt; margin-bottom:8pt; text-transform:uppercase; border-bottom:1px solid ${docxColors.border}; padding-bottom:4pt;">${companyData.okved.title}</h2>`;
  bodyContent += `<table style="width:100%; border-collapse:collapse;">`;
  companyData.okved.items.forEach(item => {
    bodyContent += `
      <tr>
        <td style="padding:3pt 0; font-size:10pt; font-weight:bold; color:${docxColors.mainText}; width:70pt;">${item.code}</td>
        <td style="padding:3pt 0; font-size:10pt; color:${docxColors.muted};">${item.name}</td>
      </tr>
    `;
  });
  bodyContent += `</table>`;

  const docHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'><title>Карточка организации ИП Пугин Е.А.</title></head>
    <body style="font-family: Arial, sans-serif;">${bodyContent}</body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + docHtml], { type: 'application/msword;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Карточка-организации-ИП-Пугин-ЕА.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCompanyCard();

  // Копирование
  const copyBtn = document.getElementById('btn-copy-data');
  const copyTooltip = document.getElementById('copy-tooltip');

  copyBtn?.addEventListener('click', () => {
    const textToCopy = getFormattedCompanyText();
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (copyTooltip) {
        const originalText = copyTooltip.innerText;
        copyTooltip.innerText = 'Скопировано!';
        setTimeout(() => { copyTooltip.innerText = originalText; }, 2000);
      }
    });
  });

  // Экспорт
  document.getElementById('btn-export-pdf')?.addEventListener('click', exportToPdf);
  document.getElementById('btn-export-docx')?.addEventListener('click', exportToDocx);
});