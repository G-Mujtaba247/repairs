import React from 'react';

const EmptyState = ({ title = 'No Data', description = '', icon = '📭', action }) => {
  return (
    <div className="bg-background/40 dark:bg-input/20 border border-border rounded-lg p-8 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default React.memo(EmptyState);
