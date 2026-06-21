# Angular Skill

**Category:** Domain - Web Frontend  
**Priority:** 65

## Overview

Expert knowledge for Angular application development.

## Key Topics

- Components and templates
- Dependency injection
- RxJS patterns
- Angular Signals
- Standalone components

## Usage

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `<button (click)="increment()">{{ count }}</button>`,
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++;
  }
}
```
